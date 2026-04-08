"use server"

import { organizationApi } from "./organizationApi"

const SERVER_URL = process.env.API_FF_SERVICE_URL_V1
if (!SERVER_URL) {
	throw new Error("API_FF_SERVICE_URL_V1 is not defined")
}

export const getOrganization = async (
	uuidDepartment: string,
	cookieString?: string,
): Promise<ReturnType<typeof organizationApi.getOrganization>> => {
	return organizationApi.getOrganization(
		SERVER_URL,
		uuidDepartment,
		cookieString,
	)
}
