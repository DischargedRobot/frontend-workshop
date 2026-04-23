"use client"

import { Grid, Segmented } from "antd"
import { memo, useState } from "react"
import { IRole, DEFAULT_ROLES } from "@/shared/model/Role/types"
import UserRolesList from "./UserRolesList"
import "./AddUserRoles.scss"

const { useBreakpoint } = Grid

interface Props {
	roles?: IRole[]
	value?: IRole[]
	onChange: (allRoles: IRole[], changedRole: IRole) => void
}

const AddUserRoles = ({ roles, value, onChange }: Props) => {

	const displayRoles = roles ?? value ?? DEFAULT_ROLES

	const titles = ["Сотрудники", "Фич флаги", "Отделы"]
	const countCollumn = titles.length
	const blockSize = Math.ceil(displayRoles.length / countCollumn)

	const isMobile = !useBreakpoint().md

	const [selectedSegment, setSelectedSegment] = useState("Сотрудники")
	const segmented = (
		<Segmented
			options={titles}
			value={selectedSegment}
			onChange={(value) => setSelectedSegment(value)}
		/>
	)


	return (
		<div className="add-user-roles">
			{titles.map((title, blockIndex) => {
				if (isMobile && title !== selectedSegment) return null

				const from = blockIndex * blockSize
				const to = Math.min((blockIndex + 1) * blockSize, displayRoles.length)
				const blockRoles = displayRoles.slice(from, to)

				const handleBlockChange = (updatedBlockRoles: IRole[], changedRole: IRole) => {
					const mergedRoles = displayRoles.map((r) => { // сливаем измененёния с отобраемыми
						const found = updatedBlockRoles.find((b) => b.type === r.type)
						return found ?? r
					})
					onChange(mergedRoles, changedRole)
				}

				return (
					<div key={blockIndex} className="add-user-roles__block">
						{isMobile && <div className="add-user-roles__segmented">{segmented}</div>}
						<h4 className="title title_litle title_bold">{title}</h4>
						<hr />
						<UserRolesList roles={blockRoles} onChange={handleBlockChange} />
					</div>
				)
			})}
		</div>
	)
}

export default memo(AddUserRoles)
