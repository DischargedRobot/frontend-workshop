import { APIJsonRequest } from "@/shared/api"
import { IDepartment, IDepartmentResponse } from ".."
import { convertIDepartmentResponseToIDepartment } from "../lib/convert"

// TODO: отрефакторить все эти departmentApi
export const departmentApiCommon = {
	getDepByUUID: async (
		url: string,
		uuidDepartment: string,
		cookieString?: string,
	): Promise<{ department: IDepartment; organizationId: number }> => {
		console.log(uuidDepartment, "getDepByUUID", url)

		const dep = await APIJsonRequest<IDepartmentResponse>(
			`${url}/find-node?organizationNodeUuid=${uuidDepartment}`,
			{
				headers: cookieString ? { Cookie: cookieString } : {},
			},
		)
		// const { organizationId, ...child } = dep
		return {
			department: convertIDepartmentResponseToIDepartment(dep),
			organizationId: dep.organizationId,
		}
	},
}
