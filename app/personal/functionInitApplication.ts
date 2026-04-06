import { organisationApi } from "@/entities/Organisation"
import { IOrganisation } from "@/entities/Organisation/model/useOrganisationStore"
import { IProfile } from "@/entities/Profile"
import { loginApi } from "@/shared/api"
import { cookies } from "next/headers"

export async function functionInitApplication(): Promise<{
	profile: IProfile
	organisation: IOrganisation
}> {
	const cookieStore = await cookies()

	// Получаем конкретную куку
	const userId = cookieStore.get("SESSION")

	const { uuidDepartment, ...profile } = await loginApi.getMe(
		`SESSION=${userId?.value}`,
	)
	console.log("uuu")
	const organisation = await organisationApi.getOrganisation(
		uuidDepartment,
		`SESSION=${userId?.value}`,
	)
	console.log("organ")
	return { profile, organisation }
}
