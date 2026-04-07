"use client"

import { IDepartment } from "@/entities/Departments"
import { SearchDropDownMenu } from "@/shared/model/SearchDropMenu"
import { memo } from "react"
import { useSelectDepartment } from "../model/useSelectDepartment"

interface Props {
	onSelect: (department: IDepartment | null) => void
	placeholder?: string
	disabled?: boolean
	className?: string
	defaultValue?: IDepartment
	departments?: IDepartment[]
}

const SelectDepartmentSearchDropMenu = ({
	onSelect,
	placeholder,
	disabled,
	className,
	defaultValue,
	departments,
}: Props) => {
	const { options } = useSelectDepartment({ departments })

	return (
		<SearchDropDownMenu<IDepartment>
			options={options}
			onSelect={onSelect}
			placeholder={placeholder}
			disabled={disabled}
			className={className}
			defaultValue={defaultValue}
		/>
	)
}

export default memo(SelectDepartmentSearchDropMenu)
