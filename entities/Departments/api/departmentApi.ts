import { IDepartment } from "../lib/DepartmentType"
import APIJsonRequest from "@/shared/api/APIJsonRequest"
import { isAPIError } from "@/shared/api/APIErrors"
import { IOrganization } from "@/entities/Organization"
import { IService, IServiceDepartment } from "../lib"
import { departmentApiCommon } from "./departmentApiCommon"
import {
	convertIDepartmentResponseToIDepartment,
	convertIDepartmentResponseToIDepartmentWithOrganization,
	convertIServiceResponseToIServiceDepartment,
	reduceDepRespToArray,
} from "../lib"

const URL_ORGANIZATION = process.env.NEXT_PUBLIC_API_ORGANIZATIONS_URL_V1
export interface IDepartmentResponse {
	id: number
	organizationId: number
	uuid: string
	path: string
	name: string
	isService: boolean
	version: number
}

export interface IDepartmentsByOrganizationId {
	items: IDepartmentResponse[]
	limit: number
	offset: number
	total: number
}

export interface IChangeDepartmentParentResponse {
	id: number
	uuid: string
	oldPath: string
	newPath: string
	version: number
	movedDescendants: IDepartmentResponse
}

interface IDepartmentChildrenResponse {
	nodeId: number
	items: IDepartmentResponse[]
}

export interface IDepartmentsSubtreeResponse {
	id: number
	uuid: string
	path: string
	name: string
	isService: boolean
	version: number
	children?: IDepartmentsSubtreeResponse[]
}

export function convertSubtreeToIDepartment(
	node: IDepartmentsSubtreeResponse,
): IDepartment {
	// console.log(node, "convertSubtreeToIDepartment node")
	return {
		id: node.id,
		uuid: node.uuid,
		path: node.path,
		name: node.name,
		isService: node.isService,
		version: node.version,
		featureFlags: [],
		children: node.children?.map(convertSubtreeToIDepartment) || [],
	}
}

interface IServiceResponse extends IService, IDepartmentResponse {}

const CLIENT_URL = process.env.NEXT_PUBLIC_API_FF_SERVICE_URL_V1
if (!CLIENT_URL) {
	throw new Error("NEXT_PUBLIC_API_FF_SERVICE_URL_V1 is not defined")
}

// TODO: отрефакторить все эти departmentApi
const departmentApi = {
	getDepByUUID: async (
		uuidDepartment: string,
	): Promise<{ department: IDepartment; organizationId: number }> => {
		return departmentApiCommon.getDepByUUID(CLIENT_URL, uuidDepartment)
	},

	getDepartmentsByOrganization: async (
		organization: IOrganization,
	): Promise<IDepartment[]> => {
		const responseData = await APIJsonRequest<IDepartmentsByOrganizationId>(
			`${URL_ORGANIZATION}/${organization.id}/nodes?limit=42&offset=0`,
		)

		return convertIDepartmentResponseToIDepartment(responseData.items)
	},

	// *** Для детей ***
	/** @desciption Возвращает детей отдела */
	getChildrenOfDepartments: async (
		organizationId: number,
		departmentId: number,
	): Promise<IDepartment[]> => {
		const response = await APIJsonRequest<IDepartmentChildrenResponse>(
			`${URL_ORGANIZATION}/${organizationId}/nodes/${departmentId}/children`,
		)
		// convertIDepartmentResponseToIDepartment(responseData.items.filter((dep) => dep.id != departmentId))
		// reduceDepartmentResponceToParentDepartment(responseData.items.filter((dep) => dep.id != department.id), department)
		return convertIDepartmentResponseToIDepartment(
			response.items.filter((dep) => dep.id != departmentId),
		)
	},

	getSubTreeOfDepartments: async (
		organizationId: number,
		departmentId: number,
	): Promise<IDepartment[]> => {
		const response = await APIJsonRequest<IDepartmentsSubtreeResponse[]>(
			`${URL_ORGANIZATION}/${organizationId}/nodes/${departmentId}/subtree`,
		)
		return response.map(convertSubtreeToIDepartment)
	},

	/** @desciption Возвращает первых детей, запрашивает потомков и потомков потомков **/
	getDescedantOfDepartments: async (
		organizationId: number,
		departmentId: number,
		depthLevel: number | "" = "",
	): Promise<IDepartment[]> => {
		const responseData = await APIJsonRequest<IDepartmentsByOrganizationId>(
			`${URL_ORGANIZATION}/${organizationId}/nodes/${departmentId}/descendants?depth=${depthLevel}`,
		)
		// convertIDepartmentResponseToIDepartment(responseData.items.filter((dep) => dep.id != departmentId))
		// reduceDepartmentResponceToParentDepartment(responseData.items.filter((dep) => dep.id != department.id), department)
		return reduceDepRespToArray(
			responseData.items.filter((dep) => dep.id != departmentId),
		)
	},

	// getDepartmentsByPath: async (path: string): Promise<IDepartment[]> => {
	// 	return await APIJsonRequest<IDepartment[]>(`${path}`)
	// },

	addDepartment: async (
		departmentName: string,
		organizationId: number,
		parentId: number,
	): Promise<IDepartment> => {
		const respDep = await APIJsonRequest<IDepartmentResponse>(
			`${URL_ORGANIZATION}/${organizationId}/nodes`,
			{
				method: "POST",
				body: JSON.stringify({
					name: departmentName,
					isService: false,
					parentId,
				}),
			},
		)
		return convertIDepartmentResponseToIDepartment(respDep)
	},

	addService: async (
		departmentName: string,
		organizationId: number,
		parentId: number,
	): Promise<IServiceDepartment> => {
		const response = await APIJsonRequest<IServiceResponse>(
			`${URL_ORGANIZATION}/${organizationId}/nodes`,
			{
				method: "POST",
				body: JSON.stringify({
					name: departmentName,
					isService: true,
					parentId,
				}),
			},
		)

		return convertIServiceResponseToIServiceDepartment(response)
	},

	/**
	 *
	 * @param organizationId айди организации, в которой нужно удалить департамент
	 * @param departmentId айди департамента, который нужно удалить
	 * @returns
	 */
	removeDepartmentById: async (
		organizationId: number,
		departmentId: number,
	) => {
		try {
			await APIJsonRequest(
				`${URL_ORGANIZATION}/${organizationId}/nodes/${departmentId}`,
				{ method: "DELETE" },
			)
		} catch (error: unknown) {
			if (isAPIError(error)) {
				switch (error.status) {
					case 401: {
						return
					}
				}
			}
		}
	},

	removeDepartmentsByIds: async (
		organizationId: number,
		departmentIds: number[],
	) => {
		await Promise.all(
			departmentIds.map((departmentId) => {
				departmentApi.removeDepartmentById(organizationId, departmentId)
			}),
		)
	},

	changeDepartmentName: async (
		newDepartment: IDepartment,
		organizationId: number,
	): Promise<void> => {
		await APIJsonRequest(
			`${URL_ORGANIZATION}/${organizationId}/nodes/${newDepartment.id}`,
			{
				method: "PATCH",
				body: JSON.stringify({
					name: `${newDepartment.name}`,
					isService: newDepartment.isService,
					version: newDepartment.version,
				}),
			},
		)

		newDepartment.version++
	},

	changeDepartmentParent: async (
		department: IDepartment,
		newParent: IDepartment,
		organizationId: number,
	): Promise<IDepartment[]> => {
		const response = await APIJsonRequest<IChangeDepartmentParentResponse>(
			`${URL_ORGANIZATION}/${organizationId}/nodes/${department.id}/move`,
			{
				method: "POST",
				body: JSON.stringify({
					newParentId: newParent.id,
					version: newParent.version,
				}),
			},
		)

		const { movedDescendants, oldPath, newPath, ...newDep } = response
		const responseDep: IDepartment = {
			...department,
			path: newPath,
			...newDep,
		}

		return [
			convertIDepartmentResponseToIDepartment(movedDescendants),
			responseDep,
		]
	},
}

export default departmentApi
