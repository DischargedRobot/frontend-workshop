import { APIJsonRequest } from "@/shared/api"
import { IDepartment, IDepartmentResponse } from ".."
import { convertIDepartmentResponseToIDepartment } from "../lib/convert"
import { url } from "inspector"
import {
	convertSubtreeToIDepartment,
	IDepartmentsByOrganizationId,
	IDepartmentsSubtreeResponse,
} from "./departmentApi"

// TODO: отрефакторить все эти departmentApi
export const departmentApiCommon = {
	getDepByUUID: async (
		url: string,
		uuidDepartment: string,
		cookieString?: string,
	): Promise<{ department: IDepartment; organizationId: number }> => {
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
		const response = await APIJsonRequest<IDepartmentsByOrganizationId>(
			`${url}/organizations/${organizationId}/nodes/${departmentId}/children`,
			{
				headers: cookieString ? { Cookie: cookieString } : {},
			},
		)

		// convertIDepartmentResponseToIDepartment(responseData.items.filter((dep) => dep.id != departmentId))
		// reduceDepartmentResponceToParentDepartment(responseData.items.filter((dep) => dep.id != department.id), department)
		return convertIDepartmentResponseToIDepartment(
			response.items.filter((dep) => dep.id != departmentId),
		)
	},

	getSubTreeOfDepartments: async (
		url: string,
		organizationId: number,
		departmentId: number,
		cookieString?: string,
	): Promise<IDepartment> => {
		const response = await APIJsonRequest<IDepartmentsSubtreeResponse>(
			`${url}/organizations/${organizationId}/nodes/${departmentId}/subtree`,
			{
				headers: cookieString ? { Cookie: cookieString } : {},
			},
		)

		return convertSubtreeToIDepartment(response)
	},
}
