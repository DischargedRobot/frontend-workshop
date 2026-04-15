import { IOrganizationResponse, organizationApi } from "./organizationApi"

const CLIENT_URL = process.env.NEXT_PUBLIC_API_FF_SERVICE_URL_V1

if (!CLIENT_URL) {
	throw new Error("NEXT_PUBLIC_API_FF_SERVICE_URL_V1 is not defined")
}

export const organizationApiClient = {
	getOrganization: async (
		organisationId: number,
	): Promise<IOrganizationResponse> => {
		return organizationApi.getOrganization(CLIENT_URL, organisationId)
	},
}
