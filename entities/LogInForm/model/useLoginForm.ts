import { useState } from "react"
import { useForm } from "react-hook-form"
import { redirect, RedirectType } from "next/navigation"

interface AuthForm {
	login: string
	password: string
}

interface ErrorAuth {
	message: string
}

export const useLoginForm = () => {
	const {
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<AuthForm>()

	const [errorAuth, setErrorAuth] = useState<ErrorAuth>()

	const onSubmit = handleSubmit(async (data: AuthForm) => {
		const response = await fetch("/login", {
			method: "POST",
			body: JSON.stringify({
				login: data.login,
				password: data.password,
			}),
		})

		const responseData = await response.json()

		if (!response.ok) {
			setErrorAuth(responseData.error)
			return
		}

		redirect("/ffMenu", RedirectType.push)
	})

	return { onSubmit, control, errors, errorAuth }
}
