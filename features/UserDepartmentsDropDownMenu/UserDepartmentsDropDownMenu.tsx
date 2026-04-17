"use client"

import { useDepartmentsStore } from "@/entities/Departments/model/useDepartmentsStore"
import "./UserDepartmentsDropDownMenu.scss"

import { memo } from "react"
import { useShallow } from "zustand/shallow"
import { SelectDepartmentSearchDropMenu } from "@/features/SelectDepartmentSearchDropMenu"
import { IDepartment } from "@/entities/Departments"

interface Props {
	currentDepartment?: number
	onSelect: (dep: IDepartment | null) => void
	className?: string
}

const UserDepartmentsDropDownMenu = (props: Props) => {
	const { className, onSelect } = props

	const departments = useDepartmentsStore(
		useShallow((state) => state.getDepartmentsIncludingAllChildren()),
	)

	return (
		<SelectDepartmentSearchDropMenu
			// departments={departments}
			onSelect={onSelect}
			className={className}
		/>
	)
}
export default memo(UserDepartmentsDropDownMenu)
