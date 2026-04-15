import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAPIErrorHandler } from "@/shared/api/APIErrorHandler"
import loginApi from "@/shared/api/loginApi"
import { APIError, mapAPIErrors } from "@/shared/api"
import { showToast } from "@/shared/ui"
import { error } from "console"
import { handler } from "next/dist/build/templates/app-route"

interface RegistrationFormData {
	login: string
	password: string
}

export const useRegistrationForm = (token: string) => {
	const [loading, setLoading] = useState(false)
	const [loginError, setLoginError] = useState<string>()
	const router = useRouter()

	const handleAPIError = useAPIErrorHandler([
		{
			error: mapAPIErrors(404),
			handler: () => {
				showToast({
					type: "error",
					text: "Ваша ссылка уже истекла",
				})
			},
		},
		{
			error: mapAPIErrors(409),
			handler: (error) => {
				setLoginError(error.message)
			},
		},
	])

	const onSubmit = async (data: RegistrationFormData) => {
		try {
			setLoading(true)
			setLoginError(undefined)

			await loginApi.registerUser(
				{
					login: data.login,
					password: data.password,
				},
				token,
			)
			await loginApi.logIn({
				username: data.login,
				password: data.password,
			})

			router.push("/personal/ffmenu")
		} catch (err) {
			handleAPIError(err)
		} finally {
			setLoading(false)
		}
	}

	return { onSubmit, loading, loginError }
}
