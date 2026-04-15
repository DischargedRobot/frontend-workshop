import { departmentApiServer } from "@/entities/Departments/api/departmentApiServer"
import { organizationApiServer } from "@/entities/Organization/api/organizationApiServer"
import { IOrganization } from "@/entities/Organization/model/useOrganizationStore"
import { IProfile } from "@/entities/Profile"
import { APIError } from "@/shared/api"
import { getMeServer } from "@/shared/api"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { cache } from "react"

export const functionInitApplication = cache(
	async function functionInitApplication(): Promise<{
		profile: IProfile
		organization: IOrganization
	}> {
		const cookieStore = await cookies()
		console.log("functionInitApplication")
		// Получаем конкретную куку
		const cookieHeader = cookieStore.toString()
		try {
			const { uuidDepartment, ...profile } =
				await getMeServer(cookieHeader)
			console.log("functionInitApplication profile", profile)

			const { department: organisationChild, organizationId } =
				await departmentApiServer.getDepByUUID(
					uuidDepartment,
					cookieHeader,
				)
			console.log(
				"functionInitApplication organisationChild",
				organisationChild,
			)

			const organization = await organizationApiServer.getOrganization(
				organizationId,
				cookieHeader,
			)
			console.log("functionInitApplication organization", organization)

			return {
				profile,
				organization: { ...organization, child: organisationChild },
			}
		} catch (err) {
			console.log(err, "functionInitApplication")
			const error = err as APIError
			if (error.status === 401) {
				redirect("/login")
			} else {
				throw err
			}
		}
	},
)
