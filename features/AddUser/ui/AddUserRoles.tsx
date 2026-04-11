"use client"

import { Switch } from "antd"
import { memo } from "react"
import { IRole, NAMES_OF_ROLE_ACTIONS, DEFAULT_ROLES } from "@/shared/model/Role/types"
import "./AddUserRoles.scss"

interface Props {
	roles?: IRole[]
	value?: IRole[]
	onChange: (allRoles: IRole[], changedRole: IRole) => void
}

const AddUserRoles = ({ roles, value, onChange }: Props) => {

	const displayRoles = roles ?? value ?? DEFAULT_ROLES
	// console.log(displayRoles, "DisplayRoles")
	const handleRoleChange = (role: IRole, isEnabled: boolean) => {
		const updatedRole = { ...role, isEnabled }
		const updatedRoles = displayRoles.map((r) =>
			r.type === role.type ? updatedRole : r,
		)
		// console.log(updatedRoles, "Update", updatedRole)
		onChange(updatedRoles, updatedRole)
	}
	// console.log(displayRoles, "AddUserRoles", value, "sa", roles)

	const titles = ["Сотрудники", "Фич флаги", "Отделы"]
	const countCollumn = titles.length
	const blockSize = displayRoles.length / countCollumn

	return (
		<div className="add-user-roles">
			{Array.from({ length: countCollumn }).map((_, blockIndex) => {
				// console.log(roles, "Текущие роли")
				return (
					<div key={blockIndex} className="add-user-roles__block">
						<h4 className="title title_litle title_bold">
							{titles[blockIndex]}
						</h4>
						<hr />
						<ul className="add-user-roles__list">
							{displayRoles
								.slice(
									blockIndex * blockSize,
									(blockIndex + 1) * blockSize,
								)
								.map((role) => (
									<li
										key={role.type}
										className="add-user-roles__item"
									>
										<span className="text text_litle">
											{NAMES_OF_ROLE_ACTIONS[role.type]}
										</span>
										<Switch
											checked={role.isEnabled}
											onChange={(checked) =>
												handleRoleChange(role, checked)
											}
										/>
									</li>
								))}
						</ul>
					</div>
				)
			})}
		</div>
	)
}

export default memo(AddUserRoles)
