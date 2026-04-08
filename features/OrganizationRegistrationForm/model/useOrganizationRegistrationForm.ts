import { useState } from "react"
import { useRouter } from "next/navigation"
import { APIError, isAPIError, loginApi } from "@/shared/api"
import { useOrganizationStore } from "@/entities/Organization"
import { organizationApiClient } from "@/entities/Organization"
import { useAPIErrorHandler } from "@/shared/api/APIErrorHandler"

export type FormValues = {
	OrganizationName: string
	AdminName: string
	AdminPassword: string
}

interface RegistrationError {
	status: 401 | 409
	message: string
	field?: string
}

export const useOrganizationRegistrationForm = () => {
	const router = useRouter()
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<RegistrationError | null>(null)

	const setOrganization = useOrganizationStore(
		(state) => state.setOrganization,
	)

	const handleAPIError = useAPIErrorHandler()
	const onSubmit = async (data: FormValues) => {
		try {
			setLoading(true)
			setError(null)

			await loginApi.registerOrganization({
				organization_name: data.OrganizationName,
				login: data.AdminName,
				password: data.AdminPassword,
			})
			console.log("всё ок")
			const response = await loginApi.logIn({
				username: data.AdminName,
				password: data.AdminPassword,
			})

			const organization = await organizationApiClient.getOrganization(
				response.uuidDepartment,
			)

			setOrganization(organization)
			// console.log(organization, "orga")
			router.push("/personal/ffmenu")
		} catch (err) {
			if (isAPIError(err)) {
				switch (err.status) {
					case 401:
						setError({
							status: 401,
							message: err.customMessage ?? err.message,
						})
						break
					case 409:
						setError({
							status: 409,
							message: "Имя организации или логин уже существуют",
						})
						break
				}
			}
		} finally {
			setLoading(false)
		}
	}

	return {
		onSubmit,
		loading,
		error,
	}
}
