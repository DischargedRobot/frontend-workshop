import { isAPIError, mapAPIErrors, toAPIError } from "./APIErrors"

const APIJsonRequest = async <T>(
	endpoint: string,
	options?: RequestInit,
): Promise<T> => {
	try {
		const response = await fetch(endpoint, {
			// credentials: 'include',
			...options,
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
				...options?.headers,
			},
			credentials: "include",
		})
		if (!response.ok) {
			const error = await response.json()
			// console.log(error, "error convert", {
			// 	...mapAPIErrors(response.status),
			// 	...error,
			// })

			const apiError = toAPIError({
				...mapAPIErrors(response.status),
				...error,
			})
			// console.log(Object.values(apiError), "convert", error)
			throw apiError
		}

		const contentType = response.headers.get("content-type")
		const contenLength = response.headers.get("content-length")

		if (
			contenLength === "0" ||
			// contenLength === null ||
			!contentType?.includes("application/json")
		) {
			return {} as T
		}

		const data: T = await response.json()

		return data
	} catch (error) {
		// если нет сети
		if (error instanceof TypeError && error.message === "Failed to fetch") {
			throw mapAPIErrors(null)
		}

		// Проверяем структурно: ошибки после response.json() не являются экземпляром APIError.
		if (!isAPIError(error)) {
			throw mapAPIErrors(0)
		}

		throw error
	}
}

export default APIJsonRequest
