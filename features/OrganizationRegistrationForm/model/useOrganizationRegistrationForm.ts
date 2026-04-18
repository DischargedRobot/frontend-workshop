import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { isAPIError, loginApi } from "@/shared/api"
import { RegistrationFormValues } from "../ui/OrganizationRegistrationForm"
import useOrganizationRegistrationErrors, {
	Registration409Error,
} from "./useOrganizationRegistrationErrors"

export const useOrganizationRegistrationForm = () => {
	const router = useRouter()
	const [loading, setLoading] = useState(false)
	// тут только ошибка от запроса, и она одна, две прийти не может
	// к примеру, (либо логин не тот, либо имя организации)
	const [error, setError] = useState<Registration409Error | null>(null)

	const handleError = useOrganizationRegistrationErrors(setError)

	const lasFailedtAttemptRef = useRef<{
		organization?: string
		login?: string
	}>({})

	const onSubmit = async (data: RegistrationFormValues) => {
		try {
			// if (!error || !error.login || !error.organization) return
			setLoading(true)
			setError(null)
			lasFailedtAttemptRef.current = {
				organization: data.OrganizationName,
				login: data.login,
			}

			await loginApi.registerOrganization({
				organization_name: data.OrganizationName,
				login: data.login,
				password: data.password,
			})

			await loginApi.logIn({
				username: data.login,
				password: data.password,
			})
			router.push("/personal/ffmenu")
		} catch (err) {
			if (isAPIError(err)) {
				switch (err.status) {
					case 401:
						onSubmit(data)
						return
					case 409:
						const field = err.message
							.toLocaleLowerCase()
							.includes("login")
							? "login"
							: "organization"
						lasFailedtAttemptRef.current[field] =
							field === "login"
								? data.login
								: data.OrganizationName
						break
				}
			}

			handleError(err)
		} finally {
			setLoading(false)
		}
	}

	const clearFieldError = (
		field: "organization" | "login",
		value?: string,
	) => {
		if (
			lasFailedtAttemptRef.current &&
			lasFailedtAttemptRef.current[field] === value
		) {
			setError((prev) => ({
				...(prev ?? {}),
				[field]:
					field === "login"
						? "Вы уже пытались ввести такой логин"
						: "Вы уже пытались ввести такое имя организации",
			}))

			return
		}
		// если просто set(null) то изменение любого поля сотрёт ошибку
		// а так ошибка останется на предыдущем поле,
		// только если не появилась новая
		setError((prev) => ({ ...prev, [field]: null }))
	}

	return {
		onSubmit,
		loading,
		error,
		clearFieldError,
		setError,
	}
}

export default useOrganizationRegistrationForm
