"use client"

import useDepartmentsStore from "@/entities/Departments/model/useDepartmentsStore"
import "./UserDepartmentsDropDownMenu.scss"

import { IUser } from "@/entities/User/UserCard/ui/types"
import { memo, useState } from "react"
import { Control, Controller } from "react-hook-form"
import { useShallow } from "zustand/shallow"

interface Props {
	currentDepartment?: number
	control: Control<Pick<IUser, "login" | "password" | "departmentId">>
}

const UserDepartmentsDropDownMenu = (props: Props) => {
	const { currentDepartment, control } = props

	const [isCollapsed, setIsCollapsed] = useState(false)

	const departments = useDepartmentsStore(
		useShallow((state) => state.getDepartmentsIncludingAllChildren()),
	)
	const department = departments.find((dep) => dep.id == currentDepartment)

	const [searchQuery, setSearchQuery] = useState("")
	const displayDepartment = searchQuery || (department?.name ?? "")

	return (
		<Controller
			name="departmentId"
			control={control}
			rules={{
				validate: (value) => {
					let isExisted
					if (typeof value == "string") {
						isExisted = departments.some(
							(department) => department.name === value,
						)
					} else {
						isExisted = departments.some(
							(department) => department.id === value,
						)
					}
					return isExisted || "Отдел не найдено"
				},
			}}
			render={({ field }) => (
				<div
					className={`user-departments-drop ${isCollapsed ? "user-departments-drop_opened" : ""}`}
					style={{ display: "flex" }}
					onBlur={() => {
						setIsCollapsed(false)
					}}
				>
					<label className="text text_litle text_tiny">
						<input
							{...field}
							placeholder="Отдел"
							type="text"
							value={displayDepartment}
							onClick={() => setIsCollapsed(true)}
							onChange={(e) => {
								setSearchQuery(e.target.value)
								field.onChange(
									departments.find(
										(dep) => dep.name == e.target.value,
									)?.id,
								)
							}}
						/>
					</label>
					<ul className={`user-departments-drop__list `}>
						{departments
							.filter((department) =>
								department.name
									.toLowerCase()
									.includes(searchQuery.toLowerCase()),
							)
							.map((department) => {
								return (
									<li
										className="user-departments-drop__item text text_litle text_tiny"
										key={department.id}
										onClick={() => {
											setIsCollapsed(false)
											setSearchQuery(department.name)
											field.onChange(department.id)
										}}
									>
										{department.name}
									</li>
								)
							})}
					</ul>
				</div>
			)}
		/>
	)
}
export default memo(UserDepartmentsDropDownMenu)
