import { APIJsonRequest } from "@/shared/api"
import { IDepartment, IDepartmentResponse } from ".."
import { convertIDepartmentResponseToIDepartment } from "../lib/convert"
import { url } from "inspector"
import { IDepartmentsByOrganizationId } from "./departmentApi"

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
	/** @desciption Возвращает детей отдела */
	getChildrenOfDepartments: async (
		url: string,
		organizationId: number,
		departmentId: number,
		cookieString?: string,
	): Promise<IDepartment[]> => {
		const responseData = await APIJsonRequest<IDepartmentsByOrganizationId>(
			`${url}/${organizationId}/nodes/${departmentId}/children`,
			{
				headers: cookieString ? { Cookie: cookieString } : {},
			},
		)
		// convertIDepartmentResponseToIDepartment(responseData.items.filter((dep) => dep.id != departmentId))
		// reduceDepartmentResponceToParentDepartment(responseData.items.filter((dep) => dep.id != department.id), department)
		return convertIDepartmentResponseToIDepartment(
			responseData.items.filter((dep) => dep.id != departmentId),
		)
	},
}
