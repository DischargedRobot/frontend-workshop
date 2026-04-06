import { useOrganisationStore } from "@/entities/Organisation"
import useSWR, { useSWRConfig } from "swr"
import { useDepartmentsStore } from "../useDepartmentsStore"
import { departmentApi } from "../../api"
import { useCallback, useEffect, useMemo } from "react"
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

const useDepartmentTree = () => {
	const setFilterDepartmentIds = useUserFiltersStore(
		(state) => state.setDepartmentIds,
	)
	const filterDepartmentIds = useUserFiltersStore(
		(state) => state.departmentIds,
	)

	const organisation = useOrganisationStore((state) => state.organisation)
	const organisationId = useOrganisationStore(
		(state) => state.organisation.id,
	)
	const changeChild = useOrganisationStore((state) => state.changeChild)

	const setDepartments = useDepartmentsStore((state) => state.setDepartments)
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

	console.log(organisation)

	const { data, error } = useSWR<IDepartment[], APIError>(
		[
			["organisationId, departmentId"],
			[organisation.id, organisation.child.id],
		],
		() =>
			departmentApi.getDescedantOfDepartments(
				organisation.id,
				organisation.child.id,
				2,
			),
	)

	useEffect(() => {
		if (data !== undefined) {
			changeChild(data)
		}
	}, [data, changeChild])

	useEffect(() => {
		if (
			organisation.child !== undefined &&
			!(organisation.child instanceof APIError)
		) {
			setDepartments([organisation.child])
		}
	}, [organisation, setDepartments, error])

	const loadData = useCallback(
		async (node: IDepartmentNode) => {
			if (node.isLeaf) return
			try {
				const children = await mutate(
					[
						["organisationId", "departmentId"],
						[organisationId, node.id],
					],
					() =>
						departmentApi.getDescedantOfDepartments(
							organisation.id,
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
		[mutate, organisationId, organisation.id, changeDepartmentChildren],
	)

	const { setDepartments: setSelectedDepartments } =
		useSelectedDepartmentsStore()

	const handleCheck = (checkedKeys: number[]) => {
		setFilterDepartmentIds(checkedKeys)
		const selectedDeps = getDepartmentAndAllChildren(
			departments || [],
		).filter((dep) => checkedKeys.includes(dep.id))
		setSelectedDepartments(selectedDeps)
	}

	const handleDrop = (
		dragNode: IDepartmentNode,
		dropNodeId: number,
		dropToGap: boolean,
	) => {
		if (!dropToGap) {
			changeParentDep(dragNode, dropNodeId)
		}
	}

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
			organisationId,
			error,
			loadData,
			handleCheck,
			handleDrop,
		}),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[departments, treeData, filterDepartmentIds, organisationId, error],
	)
}

export default useDepartmentTree
