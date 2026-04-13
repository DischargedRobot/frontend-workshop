"use client"

import "./Role.scss"

import { CloseOutlined } from "@ant-design/icons"
import { IRole } from "./types"

interface Props {
	role: IRole
	onClick: () => void
	disabled?: boolean
}

const Role = (props: Props) => {
	const { role, onClick, disabled } = props

	console.log("Rendering Role:", role.name, "Disabled:", disabled)
	return (
		<button
			className={`role ${disabled ? "role_disabled" : ""}`}
			onClick={disabled ? undefined : onClick}
			disabled={disabled}
		>
			{disabled ? null : <CloseOutlined />}
			{role.name}
		</button>
	)
}

export default Role
