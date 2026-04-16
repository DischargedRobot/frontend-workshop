"use client"
import React, { useEffect } from "react"
import { IProfile, useProfileStore } from "@/entities/Profile"
import { IOrganization, useOrganizationStore } from "@/entities/Organization/model/useOrganizationStore"
import { useApplicationStore } from "@/shared/model/Application"
import { useDepartmentsStore } from "@/entities/Departments/model/useDepartmentsStore"

export const InitApplication: React.FC<{
	profile: IProfile
	organization: IOrganization
	children: React.ReactNode
}> = ({ profile, organization, children }) => {
	const setProfile = useProfileStore((s) => s.setProfile)
	const setOrganization = useOrganizationStore((s) => s.setOrganization)
	const setIsLoading = useApplicationStore((s) => s.setIsLoading)
	const isLoading = useApplicationStore((s) => s.isLoading)
	const setDepartments = useDepartmentsStore((s) => s.setDepartments)


	useEffect(() => {
		setProfile(profile)
		setOrganization(organization)
		setDepartments([organization.child])
		setIsLoading(false)
	}, [profile, organization, setProfile, setOrganization, setDepartments, setIsLoading])

	if (isLoading) return null

	// console.log("InitApplication render", profile, organization, isLoading, organization.child)
	return <>{children}</>
}