"use server"

import { IProfile } from "../lib/types"
import { TROLE, TROLE_VALUE_TO_KEY } from "../model/Role"
import APIJsonRequest from "./APIJsonRequest"
interface GetMeResponse {
	id: number
	login: string
	password: string
	roles: string[]
	uuidDepartament: string
	settings?: object
}

const AUTH_URL = process.env.API_AUT_SERVICE_URL_V1

export const getMeServer = async (
	cookiesString?: string,
): Promise<IProfile & { uuidDepartment: string }> => {
	console.log(AUTH_URL, "url for getMe ")
	const response = await APIJsonRequest<GetMeResponse>(
		`${AUTH_URL}/clients/me`,
		{
			headers: cookiesString ? { Cookie: cookiesString } : {},
			cache: "no-store", // т.к. вызываем на сервере иногда
		},
	)

	console.log(response, "response")
	return {
		id: response.id,
		login: response.login,
		password: response.password,
		roles: response.roles.map((role) => ({
			name: TROLE_VALUE_TO_KEY[role as TROLE],
			type: role as TROLE,
			isEnabled: true,
		})),
		uuidDepartment: response.uuidDepartament,
		settings: response.settings,
	}
}
