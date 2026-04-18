"use client"

import { IDepartment } from "@/entities/Departments"
import { SearchDropDownMenu } from "@/shared/model/SearchDropMenu"
import { memo } from "react"
import { useSelectDepartment } from "../model/useSelectDepartment"
import { useDepartmentsStore } from "@/entities/Departments/model"
import { useShallow } from "zustand/shallow"

interface Props {
	onSelect: (department: IDepartment | null) => void
	placeholder?: string
	disabled?: boolean
	className?: string
	defaultValue?: IDepartment
	departments: IDepartment[]
}

const SelectDepartmentSearchDropMenu = ({
	onSelect,
	placeholder,
	disabled,
	className,
	defaultValue,
	departments,
}: Props) => {

	// const departments = useDepartmentsStore(useShallow(
	// 	(state) => state.getDepartmentsIncludingAllChildren(),
	// ))
	const { options } = useSelectDepartment({ departments })

	// console.log(defaultValue, "Selectssa")
	return (
		<SearchDropDownMenu
			options={options}
			onSelect={onSelect}
			placeholder={placeholder}
			disabled={disabled}
			className={className}
			defaultValue={defaultValue}
			equalOption="id"
		/>
	)
}

export default memo(SelectDepartmentSearchDropMenu)
