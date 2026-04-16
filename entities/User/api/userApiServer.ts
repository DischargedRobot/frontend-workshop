import { userApiCommon } from "./userApiCommon"
import { ApiServer, createWrapperCommon } from "./universalApiClientServer"

const SERVER_USERS_URL = process.env.API_AUT_CLIENT_URL_V1 || ""

if (!SERVER_USERS_URL) {
	console.warn("API_AUT_CLIENT_URL_V1 is not defined")
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
