"use client"
import { useOrganizationStore } from "@/entities/Organization/model/useOrganizationStore"
import { useProfileStore } from "@/entities/Profile"
import { IProfile } from "@/entities/Profile"
import { IOrganization } from "@/entities/Organization/model/useOrganizationStore"
import { useApplicationStore } from "@/shared/model/Application"
import { useDepartmentsStore } from "@/entities/Departments/model/useDepartmentsStore"
import { useEffect } from "react"

interface InitApplicationProps {
	profile: IProfile
	organization: IOrganization
}

export const InitApplication = ({
	profile,
	organization,
}: InitApplicationProps) => {
	const setProfile = useProfileStore((state) => state.setProfile)
	const setOrganization = useOrganizationStore(
		(state) => state.setOrganization,
	)
	const setIsLoading = useApplicationStore((state) => state.setIsLoading)
	const setDepartments = useDepartmentsStore((state) => state.setDepartments)

	useEffect(() => {
		setProfile(profile)
		setOrganization(organization)
		setIsLoading(false)
		setDepartments([organization.child])
	}, [])

	return null
}
