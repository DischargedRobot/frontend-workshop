interface IResponseError {
	status: number | null
	customMessage?: string
}

export class APIError extends Error implements IResponseError {
	static readonly errorType = "APIError" // лень писать постоянно при создании
	constructor(
		public status: number | null,
		public message: string,
		public customMessage?: string,
	) {
		super((customMessage ?? message) || `Error ${APIError.errorType}`)

		this.name = "APIError"
	}
	// checkStatus(errorStatus: number): boolean {
	// 	return errorStatus === this.status
	// }
}

export function isAPIError(error: unknown): error is APIError {
	return (
		error instanceof APIError ||
		(typeof error === "object" &&
			error !== null &&
			//
			"status" in error &&
			typeof error.status === "number" &&
			error.status >= 300 &&
			error.status < 600 &&
			//
			"message" in error &&
			typeof error.message === "string")
	)
}

// все ошибки с бека
const APIErrors = {
	NETWORK: new APIError(null, "NETWORK", "Проблемы с соединением"),
	BAD_REQUEST: new APIError(400, "BAD_REQUEST", "Некорретные данные запроса"),
	UNAUTHORIZED: new APIError(
		401,
		"UNAUTHORIZED",
		"Для доступа требуется авторизация",
	),
	FORBIDEN: new APIError(
		403,
		"FORBIDDEN",
		"У Вас нету доступа к этому ресурсу",
	),
	NOT_FOUND: new APIError(404, "NOT_FOUND", "Ресурс не найден :("),
	SERVER: new APIError(500, "SERVER_ERROR", "Ошибка сервера"),
}

// можно и просто map, но мне показалось, что в случае правок, будет проще написать кейс,
// если ошибка уже есть, просто код другой, чем повторять в мап объекты
export const mapAPIErrors = (
	status: number | null | undefined,
	customMessage?: string,
): APIError => {
	let error: APIError

	switch (status) {
		case null:
			error = APIErrors.NETWORK
			break
		case 400:
			error = APIErrors.BAD_REQUEST
			break
		case 403:
			error = APIErrors.FORBIDEN
			break
		case 401:
			error = APIErrors.UNAUTHORIZED
			break
		case 404:
			error = APIErrors.NOT_FOUND
			break
		case 500:
			error = APIErrors.SERVER
			break
		default:
			error = new APIError(
				status ? status : 1,
				"UNKNOW",
				"Неизвестная ошибка",
			)
	}

	if (customMessage) {
		error.customMessage = customMessage
	}

	return error
}
