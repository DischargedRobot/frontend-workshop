import { useState } from "react"
import { FormInstance } from "antd"
import { redirect, RedirectType, useRouter } from "next/navigation"
import loginApi from "@/shared/api/loginApi"

interface AuthForm {
	login: string
	password: string
}

interface ErrorAuth {
	message: string
}

export const useLoginForm = () => {
	const [loading, setLoading] = useState(false)
	const [errorAuth, setErrorAuth] = useState<ErrorAuth | null>(null)
	const router = useRouter()
	const onSubmit = async (data: AuthForm) => {
		try {
			setLoading(true)
			setErrorAuth(null)

			await loginApi.logIn({
				username: data.login,
				password: data.password,
			})

			router.push("/personal/ffmenu")
		} catch (error) {
			setErrorAuth({ message: "Ошибка при входе" })
		} finally {
			setLoading(false)
		}
	}

	return { onSubmit, loading, errorAuth }
}
