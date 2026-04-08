"use client"
import { useOrganizationStore } from "@/entities/Organization/model/useOrganizationStore"
import { useProfileStore } from "@/entities/Profile"
import { useEffect } from "react"
import { IProfile } from "@/entities/Profile"
import { IOrganization } from "@/entities/Organization/model/useOrganizationStore"
import { useApplicationStore } from "@/shared/model/Application"

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

	useEffect(() => {
		setProfile(profile)
		setOrganization(organization)
		setIsLoading(false)
	}, [profile, organization, setProfile, setOrganization, setIsLoading])

	return null
}
