import { useState } from "react"
import { useRouter } from "next/navigation"
import { isAPIError, loginApi } from "@/shared/api"
import { useOrganizationStore } from "@/entities/Organization"
import { organizationApiClient } from "@/entities/Organization"
import { departmentApi } from "@/entities/Departments"
import { useProfileStore } from "@/entities/Profile"

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
	const setProfile = useProfileStore((state) => state.setProfile)
	const setOrganization = useOrganizationStore(
		(state) => state.setOrganization,
	)

	const onSubmit = async (data: FormValues) => {
		try {
			setLoading(true)
			setError(null)

			await loginApi.registerOrganization({
				organization_name: data.OrganizationName,
				login: data.AdminName,
				password: data.AdminPassword,
			})

			await loginApi.logIn({
				username: data.AdminName,
				password: data.AdminPassword,
			})
			router.push("/personal/ffmenu")
		} catch (err) {
			if (isAPIError(err)) {
				switch (err.status) {
					case 401:
						setError({
							status: 401,
							message: err.message,
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
