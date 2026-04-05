import { useState } from "react"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { loginApi } from "@/shared/api"
import { organisationApi, useOrganisationStore } from "@/entities/Organisation"

export type FormValues = {
	OrganisationName: string
	AdminName: string
	AdminPassword: string
}

interface RegistrationError {
	OrganisationName?: string
	AdminName?: string
	AdminPassword?: string
}

export const useRegistrationForm = () => {
	const router = useRouter()
	const [serverErrors, setServerErrors] = useState<RegistrationError>()

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormValues>()

	const setOrganisation = useOrganisationStore(
		(state) => state.setOrganisation,
	)

	const onSubmit = async (data: FormValues) => {
		try {
			await loginApi.registerOrganization({
				organisation_name: data.OrganisationName,
				login: data.AdminName,
				pasword: data.AdminPassword,
			})
		} catch {}

		try {
			const response = await loginApi.login({
				username: data.AdminName,
				password: data.AdminPassword,
			})

			const organisation = await organisationApi.getOrganisation(
				response.uuidDepartment,
			)

			setOrganisation(organisation)

			router.push("/ffMenu")
		} catch {}
	}

	return {
		register,
		handleSubmit,
		errors,
		serverErrors,
		onSubmit,
	}
}
