import { userApiCommon } from "./userApiCommon"
import { ApiServer, createWrapperCommon } from "./universalApiClientServer"

const SERVER_USERS_URL = process.env.API_AUTH_CLIENT_URL_V1 || ""

if (!SERVER_USERS_URL) {
	console.warn("API_AUTH_CLIENT_URL_V1 is not defined")
}

type TUserApi = typeof userApiCommon
type TUserApiKeys = keyof TUserApi

type TUserApiServer = ApiServer<TUserApi>

const createWrapper = <K extends TUserApiKeys>(functionKey: K, url: string) =>
	createWrapperCommon(userApiCommon, functionKey, url)

export const userApiServer = Object.fromEntries(
	Object.keys(userApiCommon).map((key) => [
		key,
		createWrapper(key as TUserApiKeys, SERVER_USERS_URL),
	]),
) as TUserApiServer

const CLIENT_USERS_URL = process.env.NEXT_PUBLIC_CLIENT_URL_V1 || ""

if (!CLIENT_USERS_URL) {
	console.warn("NEXT_PUBLIC_CLIENT_URL_V1 is not defined")
}

type TUserApiClient = ApiServer<TUserApi>

export const userApiClient = Object.fromEntries(
	Object.entries(userApiCommon).map(([key]) => [
		key,
		createWrapper(key as TUserApiKeys, CLIENT_USERS_URL),
	]),
) as TUserApiClient
