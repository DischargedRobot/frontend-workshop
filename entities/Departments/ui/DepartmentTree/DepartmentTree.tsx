"use client"

import "./DepartmentTree.scss"

import { Empty, Tree } from "antd"
import { memo, useMemo } from "react"
import useDepartmentsStore from "../../model/useDepartmentsStore"
import useDepartmentTree from "../../model/DepartmentTree/useDepartmentTree"
import TitleRender, { IDepartmentNode } from "./TitleRender"
import useOrganisationStore from "@/entities/Organisation/model/useOrganisationStore"
import { departmentApi } from "../../api"
import { useSWRConfig } from "swr"
import { APIError } from "@/shared/api/APIErrors"

const DepartmentTree = () => {
	const { filterDepartmentIds, setFilterDepartmentIds, error } =
		useDepartmentTree()

	const departments = useDepartmentsStore(
		(state) => state.departments[0]?.children,
	)
	const changeDepartmentChildren = useDepartmentsStore(
		(state) => state.changeDepartmentChildren,
	)

	const { mutate } = useSWRConfig()

	const loadData = async (node: IDepartmentNode) => {
		if (node.isLeaf) return
		// мутируем исходник, чтобы при повторном нажатии была повторная проверка (возможно, придётся убрать revalidate)
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
	}

	const organisationId = useOrganisationStore(
		(state) => state.organisation.id,
	)
	const organisation = useOrganisationStore((state) => state.organisation)

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

	const changeParentDep = useDepartmentsStore(
		(state) => state.changeParentDepartment,
	)
	return (
		<>
			{departments?.length === 0 ? (
				<Empty
					description={
						<span style={{ color: "var(--text-color) !important" }}>
							{error?.message ?? "Отделов нет :("}
						</span>
					}
				/>
			) : (
				<Tree
					checkedKeys={filterDepartmentIds}
					onCheck={(checkedKeys) => {
						if (Array.isArray(checkedKeys)) {
							setFilterDepartmentIds(checkedKeys as number[])
							// setFilteredUsers(filterUsers(['departmentIds'], users))
						} else {
							setFilterDepartmentIds(
								checkedKeys.checked as number[],
							)
							// setFilteredUsers(filterUsers(['departmentIds'], users))
						}
					}}
					className={`tree text-table text-table_litle text-table_tiny`}
					checkable
					loadData={loadData}
					checkStrictly
					selectable={true}
					titleRender={(node) => (
						<TitleRender
							node={node as unknown as IDepartmentNode}
							organisationId={organisationId}
							key={node.key}
						/>
					)}
					// treeData={departments as unknown as IDepartmentNode[]}
					treeData={treeData}
					fieldNames={{
						key: "id",
						title: "name",
						children: "children",
					}}
					// drag and drop
					draggable
					onDrop={(info) => {
						const toDropNode = info.node
						console.log(
							toDropNode,
							info.dropPosition,
							info.dropToGap,
						)
						// dropPosition - расположение в горизонтальной иерархии узла (кто первый, кто последний, но все на 1 уровне)
						// dropToGap - false = внутрь узла кинули true = не внутрь
						if (!info.dropToGap) {
							// новый родитель, текущий узел
							changeParentDep(info.dragNode, toDropNode.id)
						}
					}}
				/>
			)}
		</>
	)
}

export default memo(DepartmentTree)
