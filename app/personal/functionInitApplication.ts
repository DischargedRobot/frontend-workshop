import { organisationApi } from "@/entities/Organisation"
import { IOrganisation } from "@/entities/Organisation/model/useOrganisationStore"
import { IProfile } from "@/entities/Profile"
import { APIError, loginApi } from "@/shared/api"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export async function functionInitApplication(): Promise<{
	profile: IProfile
	organisation: IOrganisation
}> {
	const cookieStore = await cookies()

	// Получаем конкретную куку
	const cookieHeader = cookieStore.toString()

	try {
		const { uuidDepartment, ...profile } =
			await loginApi.getMe(cookieHeader)

		const organisation = await organisationApi.getOrganisation(
			uuidDepartment,
			cookieHeader,
		)
		return { profile, organisation }
	} catch (err) {
		const error = err as APIError
		if (error.status === 401) {
			redirect("/login")
		} else {
			redirect("/error")
		}
	}
}
