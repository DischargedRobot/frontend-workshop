import "./RolesStatus.scss"

import { Popover, Switch } from "antd"
import { memo, useState } from "react"
import { PlusOutlined } from "@ant-design/icons"
import { IRole, NAMES_OF_ROLE_ACTIONS, toIRole, TROLE } from "../Role/types"

interface Props {
	roles: IRole[]
	setRoles: (roles: IRole[]) => void
}

const titles = ["Сотрудники", "Фич флаги", "Отделы"]

const RolesStatus = ({ roles, setRoles }: Props) => {

	const [isOpen, setIsOpen] = useState(false)

	const blockSize = roles.length / 3

	const content = (
		<ul className="roles-status">
			{Array.from({ length: 3 }).map((_, index) => (
				<li key={index} className="roles-status__containter">
					<h4 className="title title_very-litle">{titles[index]}</h4>
					<hr />
					<ul className="roles-status__role-containter text text text_tiny">
						{roles
							.slice(index * blockSize, (index + 1) * blockSize)
							.map((role) => (
								<li key={role.type} className="roles-status__role">
									{NAMES_OF_ROLE_ACTIONS[role.type]}
									<Switch
										checked={role.isEnabled}
										onChange={(value) => {
											setRoles(
												roles.map((r) =>
													r.type === role.type ? { ...r, isEnabled: value } : r,
												),
											)
										}}
									/>
								</li>
							))}
					</ul>
				</li>
			))}
		</ul>
	)

	return (
		<Popover
			classNames={{ container: "roles-status-popover" }}
			content={content}
			open={isOpen}
			placement="right"
			trigger="click"
			onOpenChange={setIsOpen}
			autoAdjustOverflow
		>
			<button className="add-role">
				<PlusOutlined />
			</button>
		</Popover>
	)
}

export default memo(RolesStatus)
