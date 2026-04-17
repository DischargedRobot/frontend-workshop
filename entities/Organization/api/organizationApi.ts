import { APIJsonRequest } from "@/shared/api"
// import { IOrganization } from "../model/useOrganizationStore"
// import { IDepartmentResponse } from "@/entities/Departments"

export interface IOrganizationResponse {
	id: number
	name: string
}

export const organizationApi = {
	getOrganization: async (
		url: string,
		organisationId: number,
		cookieString?: string,
	): Promise<IOrganizationResponse> => {
		return APIJsonRequest<IOrganizationResponse>(
			`${url}/organizations/${organisationId}`,
			{
				headers: cookieString ? { Cookie: cookieString } : {},
			},
		)
		// const { organizationId, ...child } = dep
		// return {
		// 	id: organizationId,
		// 	name: child.name,
		// 	child: { ...child, children: [], featureFlags: [] },
		// }
	},
}
