"use client"

import { useBreadcrumbStore } from "@/entities/DepartmentBreadcamb"
import { IDepartment, useDepartmentsStore } from "@/entities/Departments"
import { useFFFiltersStore } from "@/entities/FF"
import { IOrganization, useOrganizationStore } from "@/entities/Organization"
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

	const changeOrganisationChild = useOrganizationStore(
		(state) => state.changeChild,
	)

	console.log(departments, "InitFFMenu", organization.child)
	useEffect(() => {
		const childWithDepartments = {
			...organization.child,
			children: departments,
		}
		changeOrganisationChild(childWithDepartments)
		setBreadcrumbPath([childWithDepartments])
		setDepartments([childWithDepartments])
		setFFFilterDepartments([childWithDepartments, ...departments])
	}, [])

	return children
}
