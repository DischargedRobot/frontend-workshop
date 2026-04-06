import { useState } from "react"
import { useRouter } from "next/navigation"

interface RegistrationFormData {
	login: string
	password: string
}

interface RegistrationError {
	message: string
	field?: string
}

export const useRegistrationForm = () => {
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<RegistrationError | null>(null)
	const router = useRouter()

	const onSubmit = async (data: RegistrationFormData) => {
		try {
			setLoading(true)
			setError(null)

			// TODO: Реализовать API запрос для регистрации
			// const response = await registrationApi.register({
			//   username: data.login,
			//   email: data.email,
			//   password: data.password,
			//   firstName: data.firstName,
			//   lastName: data.lastName,
			// })

			// Временно просто редирект
			router.push("/login")
		} catch (err) {
			setError({
				message: "Ошибка при регистрации",
			})
		} finally {
			setLoading(false)
		}
	}

	return { onSubmit, loading, error }
}
