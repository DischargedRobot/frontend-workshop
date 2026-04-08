import { useOrganizationStore } from "@/entities/Organization"
import useSWR, { useSWRConfig } from "swr"
import { useDepartmentsStore } from "../useDepartmentsStore"
import { departmentApi } from "../../api"
import { useCallback, useEffect, useMemo } from "react"
import { APIError } from "@/shared/api/APIErrors"
import { IDepartment } from "../../lib"
import { useUserFiltersStore } from "@/entities/User"
import type { IDepartmentNode } from "../../ui/DepartmentTree/TitleRender"
import { useSelectedDepartmentsStore } from "../useSelectedDepartmentsStore"
import { defineAbility } from "@/shared/model/Ability"
import { profile } from "console"

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

	const organization = useOrganizationStore((state) => state.organization)
	const organizationId = useOrganizationStore(
		(state) => state.organization.id,
	)
	const changeChild = useOrganizationStore((state) => state.changeChild)

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

	console.log(organization)

	const { data, error } = useSWR<IDepartment[], APIError>(
		organization.child // не видит, мб из-з гидратации, поэтому тут првоерка
			? [
					["organizationId, departmentId"],
					[organization.id, organization.child.id],
				]
			: null,
		() =>
			departmentApi.getDescedantOfDepartments(
				organization.id,
				organization.child.id,
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
			organization.child !== undefined &&
			!(organization.child instanceof APIError)
		) {
			setDepartments([organization.child])
		}
	}, [organization, setDepartments, error])

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

	// const ability = defineAbility(profile)

	return useMemo(
		() => ({
			departments,
			treeData,
			filterDepartmentIds,
			organizationId,
			error,
			loadData,
			handleCheck,
			handleDrop,
		}),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[departments, treeData, filterDepartmentIds, organizationId, error],
	)
}

export default useDepartmentTree
