"use client"

import "./Role.scss"

import { CloseOutlined } from "@ant-design/icons"
import { IRole } from "./types"

interface Props {
	role: IRole
	onClick: () => void
}

const Role = (props: Props) => {
	const { role, onClick } = props

	return (
		<button className="role" onClick={onClick}>
			<CloseOutlined />
			{role.name}
		</button>
	)
}

export default Role
