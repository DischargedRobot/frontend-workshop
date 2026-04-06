"use client"

import { useCallback } from "react"
import { APIError, isAPIError, mapAPIErrors } from "./APIErrors"
import { showToast } from "../ui"
import { useRouter } from "next/navigation"

export const useAPIErrorHandler = () => {
	const router = useRouter()

	// чтобы при рендере компонента не вызывалась повторно
	const handleError = useCallback(
		(error: APIError | Error) => {
			const apiError: APIError = isAPIError(error)
				? error
				: mapAPIErrors(null)

			switch (apiError.status) {
				case 401:
					router.push("/auth")
					break
				case 404:
					router.push("/notFound")
					break
				case 500:
					router.push("/internal")
					break
				default:
					console.log("оШИБКА!!!!!")
					showToast({
						type: "warning",
						text: error.message,
					})
			}
		},
		[router],
	)

	return handleError
}
