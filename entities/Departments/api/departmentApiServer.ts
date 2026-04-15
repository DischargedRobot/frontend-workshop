import { departmentApiCommon } from "./departmentApiCommon"

const SERVER_URL = process.env.API_FF_SERVICE_URL_V1
if (!SERVER_URL) {
	throw new Error("API_FF_SERVICE_URL_V1 is not defined")
}
// TODO: отрефакторить все эти departmentApi

type TDepartmentApi = typeof departmentApiCommon

type TDepartmentApiServer = {
	[Key in keyof TDepartmentApi]: TDepartmentApi[Key] extends (
		url: string,
		...args: infer A // тип отсальных аргов
	) => infer R // тип промиса
		? (...args: A) => R
		: never
}

type TDepartmentApiCommonKeys = keyof TDepartmentApi

// Функция для создания обёртки с уже вызванным SERVER_URL
function createWrapper<K extends TDepartmentApiCommonKeys>(
	key: K,
): TDepartmentApiServer[K] {
	return ((...args: Parameters<TDepartmentApiServer[K]>) =>
		(departmentApiCommon[key] as (...a: unknown[]) => unknown).apply(null, [
			SERVER_URL as string,
			...args,
		])) as TDepartmentApiServer[K]
}

export const departmentApiServer = Object.fromEntries(
	(Object.keys(departmentApiCommon) as TDepartmentApiCommonKeys[]).map(
		(key) => [key, createWrapper(key)],
	),
) as TDepartmentApiServer
