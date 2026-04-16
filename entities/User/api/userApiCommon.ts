import APIJsonRequest from "@/shared/api/APIJsonRequest"
import { IUser } from "../lib"
import { IDepartment } from "@/entities/Departments"
import { toIRole, TROLE } from "@/shared/model/Role/types"

export interface IUserResponseItem {
	id: number
	login: string
	uuidDepartament: string
	roles: TROLE[]
}

export const userApiCommon = {
	getUserByDepartment: async (
		clientsUrl: string,
		department: IDepartment,
		cookies?: string,
	): Promise<IUser[]> => {
		const response = await APIJsonRequest<IUserResponseItem[]>(
			`${clientsUrl}/by-department/${department.uuid}`,
			{
				headers: cookies ? { Cookie: cookies } : {},
			},
		)

		return response.map((user) => ({
			id: user.id,
			login: user.login,
			departmentId: department.id,
			roles: user.roles.map(toIRole),
		}))
	},

	getUsersByDepartment: async (
		clientsUrl: string,
		departments: IDepartment[],
		cookies?: string,
	): Promise<IUser[]> => {
		const results = await Promise.all(
			departments.map((dep) =>
				userApiCommon.getUserByDepartment(clientsUrl, dep, cookies),
			),
		)

		return results.flat()
	},
}
