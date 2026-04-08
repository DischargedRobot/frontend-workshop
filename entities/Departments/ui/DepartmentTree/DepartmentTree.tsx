"use client"

import "./DepartmentTree.scss"

import { Empty, Tree } from "antd"
import { memo } from "react"
import useDepartmentTree from "../../model/DepartmentTree/useDepartmentTree"
import TitleRender, { IDepartmentNode } from "./TitleRender"

const DepartmentTree = () => {
	const {
		departments,
		treeData,
		filterDepartmentIds,
		organizationId,
		error,
		loadData,
		handleCheck,
		handleDrop,
	} = useDepartmentTree()

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
							handleCheck(checkedKeys as number[])
						} else {
							handleCheck(checkedKeys.checked as number[])
						}
					}}
					className="tree text-table text-table_litle text-table_tiny"
					checkable
					loadData={loadData}
					checkStrictly
					selectable={true}
					titleRender={(node) => (
						<TitleRender
							node={node as unknown as IDepartmentNode}
							organizationId={organizationId}
							key={node.key}
						/>
					)}
					treeData={treeData}
					fieldNames={{
						key: "id",
						title: "name",
						children: "children",
					}}
					draggable
					onDrop={(info) => {
						handleDrop(
							info.dragNode as unknown as IDepartmentNode, // Перетаскиваемый отдел
							(info.node as unknown as IDepartmentNode).id, // ID узла, куда падает
							info.dropToGap, // бросили между узулами = true иначе внутрь false
						)
					}}
				/>
			)}
		</>
	)
}

export default memo(DepartmentTree)
