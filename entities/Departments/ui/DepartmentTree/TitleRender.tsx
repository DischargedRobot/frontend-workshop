import React, { useEffect, useRef, useState } from "react"
import { IDepartment } from "../../lib"
import { DataNode } from "antd/es/tree"
import { departmentApi } from "../../api"
import { useDepartmentsStore } from "../../model"

export interface IDepartmentNode
	extends IDepartment, Omit<DataNode, "children" | "isService"> {}

interface Props {
	node: IDepartmentNode
	organizationId: number
}

const TitleRender = (props: Props): React.ReactNode => {
	const { node, organizationId } = props

	const [isEditable, setIsEditable] = useState(false)
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

	return (
		<>
			{/* TODO: Просто дизейблед надо */}
			{isEditable ? (
				<input
					style={{ paddingLeft: "8px" }}
					ref={inputRef}
					// onClick={(e) => {e.stopPropagation()}}
					onChange={(e) => setTitle(e.target.value)}
					value={title}
					onBlur={(e) => {
						changeName(node, e.target.value)
						departmentApi.changeDepartmentName(
							{ ...node, name: e.target.value },
							organizationId,
						)
						setIsEditable(false)
					}}
				/>
			) : (
				<span
					style={{ margin: "10px 0" }}
					// onClick={(e) => {e.stopPropagation()}}
					onDoubleClick={() => {
						setIsEditable(true)
						console.log("ssss")
					}}
				>
					{title}
				</span>
			)}
		</>
	)
}

export default TitleRender
