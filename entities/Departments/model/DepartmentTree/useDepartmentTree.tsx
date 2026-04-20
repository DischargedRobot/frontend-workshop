import { useOrganizationStore } from "@/entities/Organization"
import useSWR, { useSWRConfig } from "swr"
import { useDepartmentsStore } from "../useDepartmentsStore"
import { departmentApi } from "../../api"
import { useCallback, useMemo } from "react"
import { APIError, FFAPIErrors } from "@/shared/api/APIErrors"
import { IDepartment } from "../../lib"
import type { IDepartmentNode } from "../../ui/DepartmentTree/TitleRender"
import { useSelectedDepartmentsStore } from "../useSelectedDepartmentsStore"
import { useAPIErrorHandler } from "@/shared/api/APIErrorHandler"
import { showToast } from "@/shared/ui"

const getDepartmentAndAllChildren = (
	departments: IDepartment[],
): IDepartment[] => {
	return departments.reduce(
		(allDepartments: IDepartment[], department: IDepartment) => {
			allDepartments.push(department)

			if (department.children.length != 0) {
				allDepartments.push(
					...getDepartmentAndAllChildren(department.children),
				)
			}

			return allDepartments
		},
		[],
	)
}

interface Props {
	onLoaded?: (departments: IDepartment[]) => void
	onCheckLeaf?: (department: IDepartment, checkedKeys: number[]) => void
	onUncheckLeaf?: (department: IDepartment, checkedKeys: number[]) => void
}
const useDepartmentTree = ({ onLoaded, onCheckLeaf, onUncheckLeaf }: Props) => {

	const organization = useOrganizationStore((state) => state.organization)
	const organizationId = useOrganizationStore(
		(state) => state.organization.id,
	)
	const changeChild = useOrganizationStore((state) => state.changeChild)

	const departments = useDepartmentsStore(
		(state) => state.departments[0]?.children,
	)
	const changeDepartmentChildren = useDepartmentsStore(
		(state) => state.changeDepartmentChildren,
	)
	const changeParentDep = useDepartmentsStore(
		(state) => state.changeParentDepartment,
	)

	const { mutate } = useSWRConfig()

	// первоначальная загрузка дерева отделов при загрузки компонента,
	//  мб лучше в useEffect это всё обернуть, а не так, ключ-то
	// (айди организации и корвеного отдела) не меняется в пределах сессии, 
	// но тогда я не смогу в другом компоненте обратится
	const { error, isValidating } = useSWR<IDepartment[], APIError>(
		organization.child // не видит, мб из-з гидратации,
			? // поэтому тут првоерка
			[
				["department", "organizationId", "departmentId"],
				["all", organization.id, organization.child.id],
			]
			: null,
		() =>
			departmentApi.getDescedantOfDepartments(
				organization.id,
				organization.child.id,
			),
		{
			revalidateOnFocus: false,
			revalidateOnReconnect: false,
			revalidateIfStale: false,
			onSuccess: (departments) => {
				changeChild({ ...organization.child, children: departments })
				changeDepartmentChildren(organization.child, departments)
				onLoaded?.([...departments])
			},
		},
	)

	const loading = isValidating && (departments === undefined || departments.length === 0)

	// const loadData = useCallback(
	// 	async (node: IDepartmentNode) => {
	// 		if (node.isLeaf) return
	// 		try {
	// 			const children = await mutate(
	// 				[
	// 					["organizationId", "departmentId"],
	// 					[organizationId, node.id],
	// 				],
	// 				() =>
	// 					departmentApi.getDescedantOfDepartments(
	// 						organization.id,
	// 						node.id,
	// 						2,
	// 					),
	// 			)
	// 			if (children != undefined) {
	// 			}
	// 		} catch (error) {
	// 			if (error instanceof APIError && error.status === 404) {
	// 				changeDepartmentChildren(node, [])
	// 			}
	// 		}
	// 	},
	// 	[mutate, organizationId, organization.id, changeDepartmentChildren],
	// )

	const setSelectedDepartments = useSelectedDepartmentsStore(
		(state) => state.setDepartments,
	)

	const handleCheck = useCallback(
		(checkedKeys: number[], node: IDepartmentNode, checked: boolean) => {
			const selectedDeps = getDepartmentAndAllChildren(departments || [])
				.filter((dep) => checkedKeys.includes(dep.id))

			// Если ни один отедл не выбран, 
			// то ставим детей первого уровня
			setSelectedDepartments(
				selectedDeps.length === 0
					? useDepartmentsStore.getState().departments[0]?.children || []
					: selectedDeps
			)

			if (checked) {
				onCheckLeaf?.(node, checkedKeys)
			} else {
				onUncheckLeaf?.(node, checkedKeys)
			}
		},
		[
			departments,
			setSelectedDepartments,
			onCheckLeaf,
			onUncheckLeaf,
		],
	)


	// оптимизировать
	const handleMoveDepAPIError = useAPIErrorHandler([{
		error: FFAPIErrors.SERVICE_CANNOT_HAVE_DESCENDANTS,
		handler: () => {
			showToast({
				type: "error",
				title: "Ошибка при перемещении отдела",
				text: "Сервис не может иметь потомков",
			})
		},

	},
	{
		error: FFAPIErrors.OPTIMISTIC_LOCK,
		handler: () => {
			showToast({
				type: "error",
				title: "Ошибка при перемещении отдела",
				text: "Сервис не может иметь потомков",
			})
		}
	}])

	// TODO: должен блокировать любые изменения с отделом,
	//  пока не будет получен ответ от сервера
	// Обработчик перетаскивания отдела в дереве
	const handleDrop = useCallback(
		async (
			dragNode: IDepartmentNode, // Перетаскиваемый отдел
			dropNode: IDepartmentNode, // ID узла, куда падает
			dropToGap: boolean, // true = между узлами, false = внутри узла
		) => {
			// Если внутри узла (не между узлами)
			console.log("handleDrop", { dragNode, dropNode, dropToGap })

			// if (!dropToGap) {
			try {
				const responseDep = await departmentApi.changeDepartmentParent(
					dragNode as IDepartment,
					dropNode as IDepartment,
					organization.id,
				)

				// // После успешного изменения получим свежие дети корневого отдела
				// const key = [
				// 	["department", "organizationId", "departmentId"],
				// 	["all", organization.id, organization.child.id],
				// ]

				// const fresh = await mutate(
				// 	key,
				// 	() =>
				// 		departmentApi.getDescedantOfDepartments(
				// 			organization.id,
				// 			organization.child.id,
				// 		),
				// )

				// if (fresh && Array.isArray(fresh)) {
				// 	changeChild({ ...organization.child, children: fresh })
				// 	changeDepartmentChildren(organization.child, fresh)
				// 	onLoaded?.([...fresh])
				// }
				changeParentDep(dragNode, dropNode.id)
			} catch (err) {
				handleMoveDepAPIError(err)
				// console.log("Failed to move department", err)
				// // Откатим изменения, перезагрузив данные из API
				// await mutate(
				// 	[
				// 		["department", "organizationId", "departmentId"],
				// 		["all", organization.id, organization.child.id],
				// 	],
				// )
			}
			// } else {
		},
		[changeParentDep, changeChild, onLoaded, organization.child, changeDepartmentChildren, mutate, handleMoveDepAPIError, organization.id, organization.child, organization.child?.id],
	)

	const treeData = useMemo(
		() =>
			departments?.map(
				(department) =>
					({
						...department,
						isLeaf:
							department.children.length === 0 ||
								department.isService
								? true
								: false,
					}) as IDepartmentNode,
			),
		[departments],
	)

	return useMemo(
		() => ({
			departments,
			treeData,
			organizationId,
			error,
			loading,
			handleCheck,
			handleDrop,
		}),
		[
			departments,
			treeData,
			organizationId,
			error,
			loading,
			handleDrop,
			handleCheck,
		],
	)
}

export default useDepartmentTree
