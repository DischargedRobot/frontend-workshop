import { APIJsonRequest } from "@/shared/api"
import { IOrganisation } from "../model/useOrganisationStore"
import { IDepartment } from "@/entities/Departments"

const URL = process.env.NEXT_PUBLIC_API_URL_V1
// /api/v1/find-node
export const organisationApi = {
	getOrganisation: async (uuidDepartment: string): Promise<IOrganisation> => {
		const dep = await APIJsonRequest<
			IDepartment & { organisationId: number }
		>(`${URL}/find-node`)

		return {
			id: dep.organisationId,
			name: dep.name,
			child: dep,
		}
	},
}
