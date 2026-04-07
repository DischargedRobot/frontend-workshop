import "./RolesStatus.scss"

import { Switch } from "antd"
import { memo, useState } from "react"
import { PlusOutlined } from "@ant-design/icons"
import { IRole, NAMES_OF_ROLE_ACTIONS } from "../Role/types"

interface Props {
	roles: IRole[]
	setRoles: (roles: IRole[]) => void
}

const titles = ["Сотрудники", "Фич флаги", "Отделы"]

const RolesStatus = ({ roles, setRoles }: Props) => {
	const [isVisible, setIsVisible] = useState(false)

	const blockSize = roles.length / 3
	return (
		<>
			<button
				className="add-role"
				onClick={() => setIsVisible((prev) => !prev)}
			>
				<PlusOutlined />
			</button>
			{isVisible && (
				<ul className="roles-status">
					{Array.from({ length: blockSize - 1 }).map((_, index) => (
						<li key={index} className="roles-status__containter">
							<h4 className="title title_very-litle">
								{titles[index]}
							</h4>
							<hr />
							<ul className="roles-status__role-containter text text text_tiny">
								{roles
									.slice(
										index * blockSize,
										(index + 1) * blockSize,
									)
									.map((role) => (
										<li
											key={role.type}
											className="roles-status__role"
										>
											{NAMES_OF_ROLE_ACTIONS[role.type]}
											<Switch
												value={role.isEnabled}
												onChange={(value) => {
													role.isEnabled = value
													setRoles([...roles])
												}}
											/>
										</li>
									))}
							</ul>
						</li>
					))}
				</ul>
			)}
		</>
	)
}

export default memo(RolesStatus)
