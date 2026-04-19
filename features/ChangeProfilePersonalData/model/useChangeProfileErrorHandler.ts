import { useRouter } from "next/navigation"
import { useMemo, useCallback, useState } from "react"
import { mapAPIErrors } from "@/shared/api"
import { useAPIErrorHandler } from "@/shared/api/APIErrorHandler"

export type ProfileApiError = {
	login?: string | null
	password?: string | null
}

export default function useChangeProfileErrorHandler() {
	const router = useRouter()
	const [profileApiError, setProfileApiError] = useState<ProfileApiError>({
		login: null,
		password: null,
	})

	const handlers = useMemo(
		() => [
			{
				error: mapAPIErrors(404),
				handler: () => router.push("/login"),
			},
			{
				error: mapAPIErrors(403),
				handler: () => {
					setProfileApiError((prev) => ({
						...prev,
						password: "Неверный текущий пароль",
					}))
				},
			},
			{
				error: mapAPIErrors(409),
				handler: () => {
					setProfileApiError((prev) => ({
						...prev,
						login: "Логин занят",
					}))
				},
			},
		],
		[router],
	)

	const handleProfileApiError = useAPIErrorHandler(handlers)

	const clearProfileApiErrorField = useCallback(
		(field: keyof ProfileApiError) => {
			setProfileApiError((prev) => ({ ...prev, [field]: null }))
		},
		[],
	)

	return {
		profileApiError,
		handleProfileApiError,
		clearProfileApiErrorField,
	}
}
