import { useState } from "react"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { loginAPi } from "@/shared/api"

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

	const onSubmit = async (data: FormValues) => {
		try {
			await loginAPi.registerOrganization({
				organisation_name: data.OrganisationName,
				login: data.AdminName,
				pasword: data.AdminPassword,
			})
		} catch {
			setServerErrors({
				OrganisationName: "Ошибка регистрации",
			})
		}

		try {
			await loginAPi.login({
				username: data.AdminName,
				password: data.AdminPassword,
			})

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
