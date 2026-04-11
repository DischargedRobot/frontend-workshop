"use server"
import { getOrganization } from "@/entities/Organization/api"
import { IOrganization } from "@/entities/Organization/model/useOrganizationStore"
import { IProfile } from "@/entities/Profile"
import { APIError } from "@/shared/api"
import { getMeServer } from "@/shared/api"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export async function functionInitApplication(): Promise<{
	profile: IProfile
	organization: IOrganization
}> {
	const cookieStore = await cookies()
	console.log("functionInitApplication")
	// Получаем конкретную куку
	const cookieHeader = cookieStore.toString()

	try {
		const { uuidDepartment, ...profile } = await getMeServer(cookieHeader)
		console.log("functionInitApplication profile", profile)
		const organization = await getOrganization(uuidDepartment, cookieHeader)
		console.log("functionInitApplication organization", organization)

		return { profile, organization }
	} catch (err) {
		console.log(err, "functionInitApplication")
		const error = err as APIError
		if (error.status === 401) {
			redirect("/login")
		} else {
			throw err
		}
	}
}
