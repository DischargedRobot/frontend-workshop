"use client"
import { memo } from "react"
import "./RoleList.scss"

import Role, { IRole } from "@/shared/model/Role"

interface Props {
	disabled?: boolean
	roles?: IRole[]
	value?: IRole[]
	changeRoles?: () => void
	onChange?: () => void
}

const RoleList = (props: Props) => {
	const { roles, value, changeRoles, onChange, disabled = false } = props

	// Алиасы: roles = value, changeRoles = onChange
	const rolesList = roles || value || []
	const handleChange = changeRoles || onChange || (() => { })

	return (
		<ul className="role-list text text_tiny text_litle">
			{rolesList.map((role, idx) => (
				<li key={role.name ?? idx}>
					<Role
						disabled={disabled}
						role={role}
						onClick={() => {
							role.isEnabled = false
							handleChange()
						}}
					/>
				</li>
			))}
		</ul>
	)
}

export default memo(RoleList)
