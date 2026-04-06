import { organisationApi } from "@/entities/Organisation"
import { IOrganisation } from "@/entities/Organisation/model/useOrganisationStore"
import { IProfile } from "@/entities/Profile"
import { loginApi } from "@/shared/api"
import { useApplicationStore } from "@/shared/model/Application"
import { useRouter } from "next/navigation"
import useSWR from "swr"

const fetcher = async () => {
	const { uuidDepartment, ...profile } = await loginApi.getMe()
	const organisation = await organisationApi.getOrganisation(uuidDepartment)
	return { profile, organisation }
}

export function useInitApplication() {
	const router = useRouter()
	const setIsLoading = useApplicationStore((state) => state.setIsLoading)

	const { data, isLoading } = useSWR("init", fetcher, {
		revalidateOnFocus: false,
		revalidateOnReconnect: false,
		revalidateIfStale: false,
		keepPreviousData: true,
		onError: () => {
			router.push("/login")
		},
	})
	return {
		profile: data?.profile,
		organisation: data?.organisation,
		isLoading,
		setIsLoading,
	}
}

// export async function getOrganisationAndProfile(): Promise<{
// 	profile: IProfile
// 	organisation: IOrganisation
// }> {
// 	const { uuidDepartment, ...profile } = await loginApi.getMe()
// 	const organisation = await organisationApi.getOrganisation(uuidDepartment)
// 	return { profile, organisation }
// }
