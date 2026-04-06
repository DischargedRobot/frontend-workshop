"use client"
import { useOrganisationStore } from "@/entities/Organisation/model/useOrganisationStore"
import { useProfileStore } from "@/entities/Profile"
import { useEffect } from "react"
import { IProfile } from "@/entities/Profile"
import { IOrganisation } from "@/entities/Organisation/model/useOrganisationStore"
import { useApplicationStore } from "@/shared/model/Application"

interface InitApplicationProps {
	profile: IProfile
	organisation: IOrganisation
}

export const InitApplication = ({
	profile,
	organisation,
}: InitApplicationProps) => {
	const setProfile = useProfileStore((state) => state.setProfile)
	const setOrganisation = useOrganisationStore(
		(state) => state.setOrganisation,
	)
	const setIsLoading = useApplicationStore((state) => state.setIsLoading)

	useEffect(() => {
		setProfile(profile)
		setOrganisation(organisation)
		setIsLoading(false)
	}, [profile, organisation, setProfile, setOrganisation, setIsLoading])

	return null
}
