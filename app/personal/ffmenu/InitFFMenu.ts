"use client"

import { useBreadcrumbStore } from "@/entities/DepartmentBreadcamb"
import { IDepartment, useDepartmentsStore } from "@/entities/Departments"
import { useFFFiltersStore } from "@/entities/FF"
import { IOrganization } from "@/entities/Organization"
import { useEffect } from "react"

interface Props {
	children: React.ReactNode
	departments: IDepartment[]
	organization: IOrganization
}

export const InitFFMenu = ({ children, departments, organization }: Props) => {
	const setDepartments = useDepartmentsStore((state) => state.setDepartments)

	const setBreadcrumbPath = useBreadcrumbStore((state) => state.setPath)
	const setFFFilterDepartments = useFFFiltersStore(
		(state) => state.setDepartments,
	)
	console.log(departments, "InitFFMenu", organization.child)
	useEffect(() => {
		setBreadcrumbPath([organization.child])
		setDepartments(departments)
		setFFFilterDepartments([organization.child])
	}, [])

	return children
}
