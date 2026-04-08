import { APIJsonRequest } from "@/shared/api"
import { IOrganization } from "../model/useOrganizationStore"
import { IDepartmentResponse } from "@/entities/Departments"

export const organizationApi = {
	getOrganization: async (
		url: string,
		uuidDepartment: string,
		cookieString?: string,
	): Promise<IOrganization> => {
		console.log("getOrganization", url)
		const dep = await APIJsonRequest<IDepartmentResponse>(
			`${url}/find-node?organizationNodeUuid=${uuidDepartment}`,
			{
				headers: cookieString ? { Cookie: cookieString } : {},
			},
		)
		const { organizationId, ...child } = dep
		return {
			id: organizationId,
			name: child.name,
			child: { ...child, children: [], featureFlags: [] },
		}
	},
}
