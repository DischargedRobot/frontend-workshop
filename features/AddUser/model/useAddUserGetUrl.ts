import { useState } from "react"
import { APIError, loginApi } from "@/shared/api"
import { useAPIErrorHandler } from "@/shared/api/APIErrorHandler"
import { showToast } from "@/shared/ui"
import { IRole } from "@/shared/model/Role/types"

export const useAddUserGetUrl = () => {
	const [url, setUrl] = useState("Тут нет ссылки, вы ещё её не получили :_(")
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
			setIsLoading(false)
		} catch (error) {
			handleAPIError(error as APIError)
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
