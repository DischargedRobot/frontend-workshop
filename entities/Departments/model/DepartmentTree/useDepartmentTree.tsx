import { useOrganizationStore } from "@/entities/Organization"
import useSWR, { useSWRConfig } from "swr"
import { useDepartmentsStore } from "../useDepartmentsStore"
import { departmentApi } from "../../api"
import { useCallback, useMemo } from "react"
import { APIError } from "@/shared/api/APIErrors"
import { IDepartment } from "../../lib"
import { useUserFiltersStore } from "@/entities/User"
import type { IDepartmentNode } from "../../ui/DepartmentTree/TitleRender"
import { useSelectedDepartmentsStore } from "../useSelectedDepartmentsStore"

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
	onCheckLeaf?: (department: IDepartment) => void
	onUncheckLeaf?: (department: IDepartment) => void
}
const useDepartmentTree = ({ onLoaded, onCheckLeaf, onUncheckLeaf }: Props) => {
	const setFilterDepartmentIds = useUserFiltersStore(
		(state) => state.setDepartmentIds,
	)
	const filterDepartmentIds = useUserFiltersStore(
		(state) => state.departmentIds,
	)

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
				2,
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

	const loadData = useCallback(
		async (node: IDepartmentNode) => {
			if (node.isLeaf) return
			try {
				const children = await mutate(
					[
						["organizationId", "departmentId"],
						[organizationId, node.id],
					],
					() =>
						departmentApi.getDescedantOfDepartments(
							organization.id,
							node.id,
							2,
						),
				)
				if (children != undefined) {
					changeDepartmentChildren(node, children)
				}
			} catch (error) {
				if (error instanceof APIError && error.status === 404) {
					changeDepartmentChildren(node, [])
				}
			}
		},
		[mutate, organizationId, organization.id, changeDepartmentChildren],
	)

	const setSelectedDepartments = useSelectedDepartmentsStore(
		(state) => state.setDepartments,
	)

	const handleCheck = useCallback(
		(checkedKeys: number[], node: IDepartmentNode, checked: boolean) => {
			setFilterDepartmentIds(checkedKeys)

			const selectedDeps = getDepartmentAndAllChildren(departments || [])
				.filter((dep) => checkedKeys.includes(dep.id))

			// Если ни один отедл не выбран, то ставим детей первого уровня
			setSelectedDepartments(
				selectedDeps.length === 0
					? organization.child.children
					: selectedDeps
			)

			if (checked) {
				onCheckLeaf?.(node)
			} else {
				onUncheckLeaf?.(node)
			}
		},
		[
			setFilterDepartmentIds,
			departments,
			organization,
			setSelectedDepartments,
			onCheckLeaf,
			onUncheckLeaf,
		],
	)

	// Обработчик перетаскивания отдела в дереве
	const handleDrop = useCallback(
		(
			dragNode: IDepartmentNode, // Перетаскиваемый отдел
			dropNodeId: number, // ID узла, куда падает
			dropToGap: boolean, // true = между узлами, false = внутри узла
		) => {
			// Если внутри узла (не между узлами)
			if (!dropToGap) {
				// Сделать перетаскиваемый отдел дочерним для целевого узла
				changeParentDep(dragNode, dropNodeId)
			}
		},
		[changeParentDep],
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
			filterDepartmentIds,
			organizationId,
			error,
			loading,
			loadData,
			handleCheck,
			handleDrop,
		}),
		[
			departments,
			treeData,
			filterDepartmentIds,
			organizationId,
			error,
			loading,
			handleDrop,
			handleCheck,
			loadData,
		],
	)
}

export default useDepartmentTree
