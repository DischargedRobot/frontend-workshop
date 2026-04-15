import { IOrganizationResponse, organizationApi } from "./organizationApi"

const SERVER_URL = process.env.API_FF_SERVICE_URL_V1
if (!SERVER_URL) {
	throw new Error("API_FF_SERVICE_URL_V1 is not defined")
}

export const organizationApiServer = {
	getOrganization: async (
		organisationId: number,
		cookieString?: string,
	): Promise<IOrganizationResponse> => {
		return organizationApi.getOrganization(
			SERVER_URL,
			organisationId,
			cookieString,
		)
	},
}
