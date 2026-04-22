"use client"

import { useCallback } from "react"
import {
	APIError,
	toAPIError,
	isAPIError,
	FFAPIError,
	AuthAPIError,
	isFFAPIError,
} from "./APIErrors"
import { showToast } from "../ui"
import { useRouter } from "next/navigation"
import loginApi from "./loginApi"

// interface CustomAPIErrorHandler {
// 	error: APIError
// 	handler: (error: APIError) => void
// }

// interface CustomFFAPIErrorHandler {
// 	error: FFAPIError
// 	handler: (error: FFAPIError) => void
// }

interface CustomErrorHandler<T extends APIError | FFAPIError> {
	error: T extends APIError ? APIError : FFAPIError
	handler: (error: T extends APIError ? APIError : FFAPIError) => void
}
export const useAPIErrorHandler = <T extends APIError | FFAPIError>(
	customHandlers: CustomErrorHandler<T>[] = [],
	defaultHandler?: (error: APIError) => void,
) => {
	const router = useRouter()

	// чтобы при рендере компонента не перезаписывалась повторно
	const handleError = useCallback(
		(error: FFAPIError | AuthAPIError | APIError | Error | unknown) => {
			// Сначала проверяем кастомные обработчики

			if (isFFAPIError(error)) {
				// console.log(
				// 	"isFFAPIError handleError",
				// 	Object.values(error),
				// 	isFFAPIError(error),
				// )

				const customHandler = customHandlers.find((handler) => {
					return (
						"type" in handler.error &&
						handler.error.type !== undefined &&
						handler.error.type === error.type
					)
				})

				if (customHandler) {
					customHandler.handler(error)
					return
				}
			}
			if (isAPIError(error)) {
				const customHandler = customHandlers.find((handler) => {
					return handler.error.status === error.status
				})

				if (customHandler) {
					customHandler.handler(
						error as T extends APIError ? APIError : FFAPIError,
					)
					return
				}
			}

			const apiError: APIError = isAPIError(error)
				? error
				: toAPIError(error)

			if (defaultHandler !== undefined) {
				defaultHandler(apiError)
				return
			}
			// Если кастомного обработчика нет, используем что есть
			switch (apiError.status) {
				case 401:
					router.push("/auth")
					break
				case 403:
					showToast({
						title: "Доступ запрещён",
						text: "У вас нет прав для выполнения этого действия, прощайте",
						type: "error",
					})
					loginApi.logOut()
					router.push("/auth")
					break
				case 404:
					showToast({
						title: "Данные отсутствуют",
						text:
							apiError.message ??
							"Запрашиваемые данные не найдены",
						type: "warning",
					})
					// router.push("/notFound")
					break
				case 409:
					// router.push("/notFound")
					break
				case 500:
					// router.push("/internal")
					break
				default:
					if (error instanceof Error) {
						showToast({
							type: "warning",
							text: error.message,
						})
					} else {
						showToast({
							type: "error",
							text: "Неизвестная ошибка",
						})
					}
			}
		},
		[router, customHandlers, defaultHandler],
	)

	return handleError
}
