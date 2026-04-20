"use client"
import { memo } from "react"
import "./RoleList.scss"

import Role, { IRole } from "@/shared/model/Role"

interface Props {
	disabled?: boolean
	roles?: IRole[]
	value?: IRole[]
	changeRoles?: (roles: IRole[]) => void
	onChange?: (roles: IRole[]) => void
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
							const newRoles = rolesList.map((r, i) => i === idx ? { ...r, isEnabled: false } : r)
							handleChange(newRoles.filter(r => r.isEnabled === true))
						}}
					/>
				</li>
			))}
		</ul>
	)
}

export default memo(RoleList)
