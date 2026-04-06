"use client"

import { useDepartmentsStore } from "@/entities/Departments/model/useDepartmentsStore"
import "./UserDepartmentsDropDownMenu.scss"

import { IUser } from "@/entities/User/lib/types"
import { memo, useState } from "react"
import { Control, Controller } from "react-hook-form"
import { useShallow } from "zustand/shallow"
import { SearchDropDownMenu } from "@/shared/model/SearchDropMenu"
import { IDepartment } from "@/entities/Departments"

interface Props {
	currentDepartment?: number
	control: Control<Pick<IUser, "login" | "password" | "departmentId">>
	className?: string
}

// TODO: отрефакторить под fsd
const UserDepartmentsDropDownMenu = (props: Props) => {
	const { currentDepartment, control, className } = props

	const departments = useDepartmentsStore(
		useShallow((state) => state.getDepartmentsIncludingAllChildren()),
	)

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
				<SearchDropDownMenu<IDepartment>
					options={departments.map((dep) => ({
						label: dep.name,
						value: dep,
					}))}
					className={`${className}`}
					onSelect={(dep) => console.log("Выбран", dep)}
					{...field}
				/>
			)}
		/>
	)
}
export default memo(UserDepartmentsDropDownMenu)
