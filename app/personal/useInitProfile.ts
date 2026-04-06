import { organisationApi } from "@/entities/Organisation"
import { IOrganisation } from "@/entities/Organisation/model/useOrganisationStore"
import { IProfile } from "@/entities/Profile"
import { loginApi } from "@/shared/api"
import { useRouter } from "next/navigation"
import useSWR from "swr"

const fetcher = async () => {
	const { uuidDepartment, ...profile } = await loginApi.getMe()
	const organisation = await organisationApi.getOrganisation(uuidDepartment)
	return { profile, organisation }
}

export function useInitProfile(): {
	profile?: IProfile
	organisation?: IOrganisation
	isLoading: boolean
} {
	const router = useRouter()

	const { data, error, isLoading } = useSWR("init", fetcher, {
		revalidateOnFocus: false,
		revalidateOnReconnect: false,
		revalidateIfStale: false,
		keepPreviousData: true,
		onError: (error) => {
			console.log(error, "error")
			router.push("/login")
		},
	})
	console.log(error, "error", isLoading)
	console.log(data, "data")
	return {
		profile: data?.profile,
		organisation: data?.organisation,
		isLoading,
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
