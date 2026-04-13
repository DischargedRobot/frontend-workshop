import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAPIErrorHandler } from "@/shared/api/APIErrorHandler"
import loginApi from "@/shared/api/loginApi"
import { APIError, mapAPIErrors } from "@/shared/api"
import { showToast } from "@/shared/ui"

interface RegistrationFormData {
	login: string
	password: string
}

export const useRegistrationForm = (token: string) => {
	const [loading, setLoading] = useState(false)
	const [loginError, seLogintError] = useState<string>()
	const router = useRouter()

	const handleAPIError = useAPIErrorHandler()

	const onSubmit = async (data: RegistrationFormData) => {
		try {
			setLoading(true)
			seLogintError(undefined)

			await loginApi.registerUser(
				{
					login: data.login,
					password: data.password,
				},
				token,
			)

			router.push("/personal/ffmenu")
		} catch (err) {
			const error = err as APIError
			switch (error.status) {
				case 409:
					seLogintError(error.message)
					return
				case 404:
					showToast({
						type: "error",
						text: "Ваша ссылка уже истекла",
					})
					return
			}

			handleAPIError(error)
		} finally {
			setLoading(false)
		}
	}

	return { onSubmit, loading, loginError }
}
