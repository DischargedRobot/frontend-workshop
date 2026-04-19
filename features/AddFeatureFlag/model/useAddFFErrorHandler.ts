import { useState, useCallback } from "react"
import { APIError, mapAPIErrors } from "@/shared/api"
import { useAPIErrorHandler } from "@/shared/api/APIErrorHandler"
import { showToast } from "@/shared/ui"

type APIErrorMessage = { name?: string; department?: string } | null

export const useAddFFErrorHandler = () => {
	const [APIErrorMessage, setAPIErrorMessage] =
		useState<APIErrorMessage>(null)

	const handleAPIError = useAPIErrorHandler([
		{
			error: mapAPIErrors(409),
			handler: () => {
				setAPIErrorMessage((prev) => ({
					...prev,
					name: "Название уже занято",
				}))
			},
		},
		{
			error: mapAPIErrors(404),
			handler: (error: APIError) => {
				showToast({
					type: "warning",
					title: error.title,
					text: error.message || "Отдел не найден",
				})
			},
		},
	])

	return { handleAPIError, APIErrorMessage, setAPIErrorMessage }
}
