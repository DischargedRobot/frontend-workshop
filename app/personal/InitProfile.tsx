"use client"
import { useOrganisationStore } from "@/entities/Organisation/model/useOrganisationStore"
import { useProfileStore } from "@/entities/Profile"
import { useEffect } from "react"
import { useInitApplication } from "./useInitApplication"
import { useRouter } from "next/navigation"

// interface ProfileCardProps {
// 	profile: IProfile
// 	organisation: IOrganisation
// }

export const InitApplication = () => {
	const router = useRouter()

	const { profile, organisation, isLoading } = useInitApplication()
	const setProfile = useProfileStore((state) => state.setProfile)
	const setOrganisation = useOrganisationStore(
		(state) => state.setOrganisation,
	)

	useEffect(() => {
		// Не делаем ничего, пока идет загрузка
		if (isLoading) {
			return
		}
		if (profile && organisation) {
			// console.log(profile, "profile")
			setProfile(profile)
			setOrganisation(organisation)
		} else {
			router.push("/login")
		}
	}, [profile, organisation, setProfile, setOrganisation, router, isLoading])

	return null
}
