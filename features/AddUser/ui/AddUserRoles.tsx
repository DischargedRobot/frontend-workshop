"use client"

import { Switch } from "antd"
import { memo } from "react"
import { IRole, NAMES_OF_ROLE_ACTIONS } from "@/shared/model/Role/types"
import "./AddUserRoles.scss"

interface Props {
	roles: IRole[]
	onChange: (allRoles: IRole[], changedRole: IRole) => void
}

const AddUserRoles = ({ roles, onChange }: Props) => {
	const handleRoleChange = (role: IRole, isEnabled: boolean) => {
		const updatedRole = { ...role, isEnabled }
		const updatedRoles = roles.map((r) =>
			r.type === role.type ? updatedRole : r,
		)
		onChange(updatedRoles, updatedRole)
	}

	const titles = ["Сотрудники", "Фич флаги", "Отделы"]
	const countCollumn = titles.length
	const blockSize = roles.length / countCollumn

	return (
		<div className="add-user-roles">
			{Array.from({ length: countCollumn }).map((_, blockIndex) => (
				<div key={blockIndex} className="add-user-roles__block">
					<h4 className="title title_litle title_bold">
						{titles[blockIndex]}
					</h4>
					<hr />
					<ul className="add-user-roles__list">
						{roles
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
			))}
		</div>
	)
}

export default memo(AddUserRoles)
