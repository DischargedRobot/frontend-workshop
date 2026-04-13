"use client"

import { useCallback } from "react"
import { APIError, isAPIError, mapAPIErrors } from "./APIErrors"
import { showToast } from "../ui"
import { useRouter } from "next/navigation"

interface CustomErrorHandler {
	error: APIError
	handler: (error: APIError) => void
}

export const useAPIErrorHandler = (
	customHandlers: CustomErrorHandler[] = [],
) => {
	const router = useRouter()

	// чтобы при рендере компонента не перезаписывалась повторно
	const handleError = useCallback(
		(error: APIError | Error) => {
			const apiError: APIError = isAPIError(error)
				? error
				: mapAPIErrors(null)

			// Сначала проверяем кастомные обработчики
			const customHandler = customHandlers.find(
				(handler) => handler.error.status === apiError.status,
			)

			if (customHandler) {
				customHandler.handler(apiError)
				return
			}

			// Если кастомного обработчика нет, используем что есть
			switch (apiError.status) {
				case 401:
					router.push("/login")
					break
				case 403:
					showToast({
						title: "Доступ запрещён",
						text: "У вас нет прав для выполнения этого действия",
						type: "error",
					})
					break
				case 404:
					// router.push("/notFound")
					break
				case 409:
					// router.push("/notFound")
					break
				case 500:
					// router.push("/internal")
					break
				default:
					console.log("оШИБКА!!!!!")
					showToast({
						type: "warning",
						text: error.message,
					})
			}
		},
		[router, customHandlers],
	)

	return handleError
}
