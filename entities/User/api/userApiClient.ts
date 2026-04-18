// import { ApiServer, createWrapperCommon } from "./universalApiClientServer"
// import { userApiCommon } from "./userApiCommon"

// const CLIENT_USERS_URL = process.env.NEXT_PUBLIC_CLIENT_URL_V1 || ""

// if (!CLIENT_USERS_URL) {
// 	console.warn("NEXT_PUBLIC_CLIENT_URL_V1 is not defined")
// }

// type TUserApi = typeof userApiCommon
// type TUserApiKeys = keyof TUserApi
// type TUserApiClient = ApiServer<TUserApi>

// const createWrapper = <K extends TUserApiKeys>(functionKey: K, url: string) =>
// 	createWrapperCommon(userApiCommon, functionKey, url)

// const userApiClient = Object.fromEntries(
// 	Object.entries(userApiCommon).map(([key]) => [
// 		key,
// 		createWrapper(key as TUserApiKeys, CLIENT_USERS_URL),
// 	]),
// ) as TUserApiClient

// export default userApiClient
