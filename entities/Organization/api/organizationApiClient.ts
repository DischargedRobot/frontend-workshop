import { IOrganization } from "../model/useOrganizationStore"
import { organizationApi } from "./organizationApi"

const URL = process.env.NEXT_PUBLIC_API_FF_SERVICE_URL_V1

if (!URL) {
	throw new Error("NEXT_PUBLIC_API_FF_SERVICE_URL_V1 is not defined")
}

export const organizationApiClient = {
	getOrganization: async (
		uuidDepartment: string,
		cookieString?: string,
	): Promise<IOrganization> => {
		return organizationApi.getOrganization(
			URL!,
			uuidDepartment,
			cookieString,
		)
	},
}
