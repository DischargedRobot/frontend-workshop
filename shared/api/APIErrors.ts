// interface IResponseError {
// 	status: number | null
// 	type: string
// }

export class APIError extends Error {
	static readonly errorType = "APIError" // лень писать постоянно при создании
	constructor(
		public status: number | null,
		public title: string,
		message?: string,
		public type?: string,
	) {
		super((message ?? title) || `Error ${APIError.errorType}`)

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
			"title" in error &&
			typeof error.title === "string")
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

interface IFFAPIError {
	code: string
	message: string
	errorType: string
}

export class FFAPIError extends APIError implements IFFAPIError {
	constructor(
		public code: string,
		public message: string,
		public errorType: string,
		status: number,
	) {
		super(status, errorType, message, code)
		this.name = "FFAPIError"
	}
	static isFFAPIError(error: unknown): error is FFAPIError {
		return (
			error instanceof FFAPIError ||
			(isAPIError(error) &&
				"code" in error &&
				typeof error.code === "string" &&
				"errorType" in error &&
				typeof error.errorType === "string" &&
				"status" in error &&
				typeof error.status === "number")
		)
	}
}

interface IAuthAPIError {
	info: string
	message: string
}

export class AuthAPIError extends APIError implements IAuthAPIError {
	constructor(
		public info: string,
		message: string,
		status: number,
	) {
		super(status, "AUTH", message)
		this.name = "AuthAPIError"
	}
	static isAuthAPIError(error: unknown): error is AuthAPIError {
		return (
			error instanceof AuthAPIError ||
			(isAPIError(error) &&
				"info" in error &&
				typeof error.info === "string")
		)
	}
}

export const isAuthAPIError = (error: unknown) =>
	AuthAPIError.isAuthAPIError(error)

export const FFAPIErrors = {
	UNEXPECTED_ERROR: new FFAPIError(
		"00-0000",
		"UNEXPECTED_ERROR",
		"UNEXPECTED_ERROR",
		500,
	),
	EMPTY_FIELD: new FFAPIError(
		"01-0001",
		"Поле %s не может быть пустым или null",
		"CLIENT_ERROR",
		400,
	),
	BAD_LIMIT: new FFAPIError(
		"01-0002",
		"Некорректный формат limit",
		"CLIENT_ERROR",
		400,
	),
	BAD_OFFSET: new FFAPIError(
		"01-0003",
		"Некорректный формат offset",
		"CLIENT_ERROR",
		400,
	),
	NO_DATA: new FFAPIError(
		"01-0004",
		"Нет данных по переданным параметрам",
		"CLIENT_ERROR",
		404,
	),
	INVALID_JSON: new FFAPIError(
		"01-0005",
		"Некорректный JSON",
		"CLIENT_ERROR",
		400,
	),
	NOT_UNIQUE_ORGANIZATION_NAME: new FFAPIError(
		"02-0001",
		"Организация с таким именем уже существует",
		"BUSINESS_ERROR",
		409,
	),
	NOT_UNIQUE_ORGANIZATION_NODE_NAME_IN_ORGANIZATION: new FFAPIError(
		"02-0002",
		"Звено организации с таким именем в этой организации уже существует",
		"BUSINESS_ERROR",
		409,
	),
	SERVICE_CANNOT_HAVE_DESCENDANTS: new FFAPIError(
		"02-0003",
		"Сервис не может иметь потомков",
		"BUSINESS_ERROR",
		409,
	),
	OPTIMISTIC_LOCK: new FFAPIError(
		"02-0004",
		"Устаревшая версия данных",
		"BUSINESS_ERROR",
		409,
	),
	CYCLE_MOVE: new FFAPIError(
		"02-0005",
		"Нельзя переместить узел в дочерний ему или в него самого",
		"BUSINESS_ERROR",
		409,
	),
	MOVE_ROOT_NODE: new FFAPIError(
		"02-0006",
		"Нельзя переместить корневой узел организации",
		"BUSINESS_ERROR",
		409,
	),
	NOT_UNIQUE_FEATURE_FLAG_NAME_IN_ORGANIZATION: new FFAPIError(
		"02-0007",
		"Фича флаг с таким именем в этой организации уже существует",
		"BUSINESS_ERROR",
		409,
	),
	PARENT_NODE_MUST_BE_IN_SAME_ORGANIZATION: new FFAPIError(
		"02-0008",
		"Нельзя создать узел, родителем которого является узел другой организации",
		"BUSINESS_ERROR",
		409,
	),
	ORGANIZATION_CAN_HAVE_ONE_ROOT_NODE: new FFAPIError(
		"02-0009",
		"Организация может иметь только один корневой узел",
		"BUSINESS_ERROR",
		409,
	),
}

/** @desc Конвертер:  APIError, устанавливаем errorType как message */
export function toAPIError(
	serverError: AuthAPIError | FFAPIError | unknown,
): APIError {
	if (isAuthAPIError(serverError)) {
		// console.log(serverError, "authError")
		return new APIError(serverError.status, "AUTH", serverError.message)
	}
	if (isFFAPIError(serverError)) {
		return new APIError(
			serverError.status,
			serverError.errorType,
			serverError.message,
			serverError.code,
		)
	}
	if (isAPIError(serverError)) {
		return new APIError(
			serverError.status,
			serverError.title,
			serverError.message,
			serverError.type,
		)
	}

	return mapAPIErrors(null)
}

export function isFFAPIError(error: unknown): error is FFAPIError {
	return FFAPIError.isFFAPIError(error)
}

// можно и просто map, но мне показалось, что в случае правок, будет проще написать кейс,
// если ошибка уже есть, просто код другой, чем повторять в мап объекты
export const mapAPIErrors = (
	status: number | null | undefined,
	message?: string,
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

	if (message) {
		error.message = message
	}

	return error
}
