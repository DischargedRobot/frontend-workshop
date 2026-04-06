"use client"
import { useOrganisationStore } from "@/entities/Organisation/model/useOrganisationStore"
import { useProfileStore } from "@/entities/Profile"
import { useEffect } from "react"
import { IProfile } from "@/entities/Profile"
import { IOrganisation } from "@/entities/Organisation/model/useOrganisationStore"

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

	useEffect(() => {
		setProfile(profile)
		setOrganisation(organisation)
	}, [profile, organisation, setProfile, setOrganisation])

	return null
}
