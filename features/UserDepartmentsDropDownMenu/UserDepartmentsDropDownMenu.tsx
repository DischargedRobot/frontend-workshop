"use client"

import { useDepartmentsStore } from "@/entities/Departments/model/useDepartmentsStore"
import "./UserDepartmentsDropDownMenu.scss"

import { IUser } from "@/entities/User/lib/types"
import { memo } from "react"
import { Control, Controller } from "react-hook-form"
import { useShallow } from "zustand/shallow"
import { SelectDepartmentSearchDropMenu } from "@/features/SelectDepartmentSearchDropMenu"
import { IDepartment } from "@/entities/Departments"

interface Props {
	currentDepartment?: number
	control: Control<Pick<IUser, "login" | "password" | "departmentId">>
	className?: string
}

const UserDepartmentsDropDownMenu = (props: Props) => {
	const { control, className } = props

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
				<SelectDepartmentSearchDropMenu
					onSelect={(dep: IDepartment | null) => {
						field.onChange(dep?.id ?? null)
					}}
					className={className}
				/>
			)}
		/>
	)
}
export default memo(UserDepartmentsDropDownMenu)
