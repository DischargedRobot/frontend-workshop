import { APIJsonRequest } from "@/shared/api"
import { IOrganisation } from "../model/useOrganisationStore"
import { IDepartment, IDepartmentResponse } from "@/entities/Departments"

const URL = process.env.NEXT_PUBLIC_API_URL_V1
// /api/v1/find-node

export const organisationApi = {
	getOrganisation: async (
		uuidDepartment: string,
		cookieString?: string,
	): Promise<IOrganisation> => {
		const dep = await APIJsonRequest<IDepartmentResponse>(
			`${URL}/find-node?organizationNodeUuid=${uuidDepartment}`,
			{
				headers: cookieString ? { Cookie: cookieString } : {},
			},
		)
		const { organizationId, uuid, ...child } = dep
		return {
			id: organizationId,
			name: child.name,
			child: { ...child, children: [], featureFlags: [] },
		}
	},
}
