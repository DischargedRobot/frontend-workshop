"use client"

import "./DepartmentTree.scss"

import { Empty, Tree, Spin } from "antd"
import { memo } from "react"
import useDepartmentTree from "../../model/DepartmentTree/useDepartmentTree"
import TitleRender, { IDepartmentNode } from "./TitleRender"
import { IDepartment } from "../../lib"
import { isDeepStrictEqual } from "util"
import { NotFoundIcon } from "@/shared/assets/Icon/NotFoundIcon/NotFoundIcon"

interface Props {
	isEditable?: boolean
	onCheckLeaf?: (department: IDepartment, checkedKeys: number[]) => void
	onUncheckLeaf?: (department: IDepartment, checkedKeys: number[]) => void
	onLoaded?: (departments: IDepartment[]) => void
}


const DepartmentTree = ({ isEditable, onLoaded, onCheckLeaf, onUncheckLeaf }: Props) => {
	const {
		departments,
		treeData,
		organizationId,
		error,
		loading,
		handleCheck,
		handleDrop,
	} = useDepartmentTree({ onLoaded, onCheckLeaf, onUncheckLeaf })

	// console.log("DepartmentTree render", { departments, treeData })

	return (
		<>
			{loading ? (
				<div style={{ display: "flex", justifyContent: "center", padding: 24 }}>
					<Spin size="large" />
				</div>
			) : departments?.length === 0 ? (
				<Empty
					image={<NotFoundIcon />}
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
					checkStrictly
					selectable={true}
					titleRender={(node) => (
						<TitleRender
							isEditableProp={isEditable}
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
							(info.node as unknown as IDepartmentNode), // ID узла, куда падает
							info.dropToGap, // бросили между узулами = true иначе внутрь false
						)
					}}
					// что-то для снижения рендеров
					virtual={false}
					motion={false}
				/>
			)}
		</>
	)
}

export default memo(DepartmentTree)
