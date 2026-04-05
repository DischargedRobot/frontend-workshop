"use client"

import { APIError, isAPIError, mapAPIErrors } from "./APIErrors"
import { useRouter } from "next/router"

export const useAPIErrorHandler = (error: APIError | Error) => {
	const apiError: APIError = isAPIError(error) ? error : mapAPIErrors(null)

	const router = useRouter()

	switch (apiError.status) {
		case 401: {
			router.push("/auth")
		}
		case 404: {
			router.push("/notFound")
		}
		case 500: {
			router.push("/internal")
		}
		default: {
			console.log("Неизветная ошибка")
		}
	}
}
