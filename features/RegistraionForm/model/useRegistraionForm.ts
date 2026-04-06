import { useState } from "react"
import { useRouter } from "next/navigation"
import { loginApi } from "@/shared/api"
import { organisationApi, useOrganisationStore } from "@/entities/Organisation"

export type FormValues = {
	OrganisationName: string
	AdminName: string
	AdminPassword: string
}

interface RegistrationError {
	message: string
	field?: string
}

export const useRegistrationForm = () => {
	const router = useRouter()
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<RegistrationError | null>(null)

	const setOrganisation = useOrganisationStore(
		(state) => state.setOrganisation,
	)

	const onSubmit = async (data: FormValues) => {
		try {
			setLoading(true)
			setError(null)

			await loginApi.registerOrganization({
				organization_name: data.OrganisationName,
				login: data.AdminName,
				password: data.AdminPassword,
			})
			console.log("всё ок")
			const response = await loginApi.logIn({
				username: data.AdminName,
				password: data.AdminPassword,
			})

			const organisation = await organisationApi.getOrganisation(
				response.uuidDepartment,
			)

			setOrganisation(organisation)
			console.log(organisation, "orga")
			router.push("/personal/ffmenu")
		} catch (err) {
			setError({
				message: "Ошибка при регистрации организации",
			})
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
