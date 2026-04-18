"use client"

import "./DepartmentTree.scss"

import { Empty, Tree, Spin } from "antd"
import { memo } from "react"
import useDepartmentTree from "../../model/DepartmentTree/useDepartmentTree"
import TitleRender, { IDepartmentNode } from "./TitleRender"
import { IDepartment } from "../../lib"

interface Props {
	onCheckLeaf?: (department: IDepartment, checkedKeys: number[]) => void
	onUncheckLeaf?: (department: IDepartment, checkedKeys: number[]) => void
	onLoaded?: (departments: IDepartment[]) => void
}


const DepartmentTree = ({ onLoaded, onCheckLeaf, onUncheckLeaf }: Props) => {
	const {
		departments,
		treeData,
		organizationId,
		error,
		loading,
		loadData,
		handleCheck,
		handleDrop,
	} = useDepartmentTree({ onLoaded, onCheckLeaf, onUncheckLeaf })

	console.log("DepartmentTree render", { departments, treeData })

	return (
		<>
			{loading ? (
				<div style={{ display: "flex", justifyContent: "center", padding: 24 }}>
					<Spin size="large" />
				</div>
			) : departments?.length === 0 ? (
				<Empty
					description={
						<span style={{ color: "var(--text-color) !important" }}>
							{error?.message ?? "Отделов нет :("}
						</span>
					}
				/>
			) : (
				<Tree
					// checkedKeys={filterDepartmentIds}
					onCheck={(checkedKeys, info) => {
						const node = info.node as unknown as IDepartmentNode
						if (Array.isArray(checkedKeys)) {
							handleCheck(checkedKeys as number[], node, info.checked)
						} else {
							handleCheck(checkedKeys.checked as number[], node, info.checked)
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
					showLine
					draggable
					onDrop={(info) => {
						handleDrop(
							info.dragNode as unknown as IDepartmentNode, // Перетаскиваемый отдел
							(info.node as unknown as IDepartmentNode).id, // ID узла, куда падает
							info.dropToGap, // бросили между узулами = true иначе внутрь false
						)
					}}
					virtual={false}
					motion={false}
				/>
			)}
		</>
	)
}

export default memo(DepartmentTree)
