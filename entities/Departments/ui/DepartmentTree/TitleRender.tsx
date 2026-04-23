import React, { useEffect, useRef, useState } from "react"
import { IDepartment } from "../../lib"
import { DataNode } from "antd/es/tree"
import { departmentApi } from "../../api"
import { useDepartmentsStore } from "../../model"
import { useAPIErrorHandler } from "@/shared/api/APIErrorHandler"
import { Avatar } from "antd"

export interface IDepartmentNode
	extends IDepartment, Omit<DataNode, "children" | "isService"> { }

interface Props {
	node: IDepartmentNode
	organizationId: number
	isEditableProp?: boolean
}

const TitleRender = (props: Props): React.ReactNode => {
	const { node, organizationId, isEditableProp } = props

	const [isEditable, setIsEditable] = useState(isEditableProp ?? false)
	const [title, setTitle] = useState(node?.name)
	const inputRef = useRef<HTMLInputElement>(null)
	useEffect(() => {
		if (isEditable && inputRef.current) {
			inputRef.current.focus()
		}
	}, [isEditable])
	const changeName = useDepartmentsStore(
		(state) => state.changeDepartmentName,
	)

	const handleAPIError = useAPIErrorHandler()
	return (
		<div style={{ display: "flex", alignItems: "center", gap: 8 }}>
			<input
				readOnly={!isEditableProp && !isEditable}
				style={{ paddingLeft: "8px" }}
				ref={inputRef}
				onChange={(e) => setTitle(e.target.value)}
				value={title}
				onBlur={(e) => {
					setIsEditable(false)
					if (e.target.value.trim() !== node.name) {
						departmentApi.changeDepartmentName(
							{ ...node, name: e.target.value },
							organizationId,
						).then(() => {
							changeName(node, e.target.value)
						}).catch(handleAPIError)
					}
				}}
				onDoubleClick={() => {
					// console.log("double click")
					setIsEditable(true)
				}}
			/>
			<Avatar size={16} style={{ padding: "6px", backgroundColor: `${node.isService ? 'var(--main-color)' : 'var(--secondary-color)'}` }}>
				{node.isService ? "S" : "D"}
			</Avatar>
		</div>
	)
}

export default TitleRender
