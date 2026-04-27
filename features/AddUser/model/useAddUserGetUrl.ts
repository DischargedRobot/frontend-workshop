import { useEffect, useState } from "react"
import { APIError, loginApi } from "@/shared/api"
import { useAPIErrorHandler } from "@/shared/api/APIErrorHandler"
import { showToast } from "@/shared/ui"
import { IRole } from "@/shared/model/Role/types"

export const useAddUserGetUrl = () => {
	const [url, setUrl] = useState("Тут будет Ваша ссылка")
	const [isLoading, setIsLoading] = useState(false)
	const handleAPIError = useAPIErrorHandler()

	const handleGetToken = async (departmentUuid: string, roles: IRole[]) => {
		try {
			setIsLoading(true)

			const token = await loginApi.generateInvite(
				roles.filter((role) => role.isEnabled),
				departmentUuid,
			)
			const newUrl = new URL(
				window.location.origin + "/registration/user",
			)
			newUrl.searchParams.set("token", token)
			setUrl(newUrl.toString())
			showToast({ type: "success", text: "Ссылка успешно сгенерирована" })
		} catch (error) {
			if (error instanceof APIError && error.status === 401) {
				showToast({
					type: "error",
					title: "У вас недостаточно прав",
					text: error.message,
				})
			}
			handleAPIError(error as APIError)
		} finally {
			setIsLoading(false)
		}
	}

	const resetUrl = () => {
		setUrl("Тут будет ваша ссылка")
	}

	return {
		url,
		setUrl,
		handleGetToken,
		isLoading,
		resetUrl,
	}
}
