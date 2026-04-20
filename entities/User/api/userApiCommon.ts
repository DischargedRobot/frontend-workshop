import APIJsonRequest from "@/shared/api/APIJsonRequest"
import { isAPIError } from "@/shared/api/APIErrors"
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
	getUsersByDepartment: async (
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
		const roleTypes = Object.getOwnPropertyNames(TROLE) as TROLE[]
		const allRoles = roleTypes.map((role) => ({
			...toIRole(role),
			isEnabled: false,
		}))
		const users = response.map((user) => {
			const userRoles = user.roles.map((role) => toIRole(role).type)
			return {
				id: user.id,
				login: user.login,
				department: department,
				roles: allRoles.map((role) => ({
					...role,
					isEnabled: userRoles.includes(role.type),
				})),
			}
		})

		// console.log(
		// 	users,
		// 	"Fetched users for department",

		// 	allRoles,
		// 	department.name,
		// )
		return users
	},

	getUsersByDepartments: async (
		clientsUrl: string,
		departments: IDepartment[],
		cookies?: string,
	): Promise<IUser[]> => {
		const results = await Promise.all(
			departments.map((dep) =>
				userApiCommon
					.getUsersByDepartment(clientsUrl, dep, cookies)
					.catch((error) => {
						if (isAPIError(error) && error.status === 404)
							return [] as IUser[]
						throw error
					}),
			),
		)

		return results.flat()
	},

	deleteUserById: async (
		url: string,
		userId: number,
		cookies?: string,
	): Promise<void> => {
		await APIJsonRequest(`${url}/${userId}`, {
			method: "DELETE",
			headers: cookies ? { Cookie: cookies } : {},
		})
	},

	deleteRolesFromUser: async (
		url: string,
		userId: number,
		roles: TROLE[],
		cookies?: string,
	): Promise<void> => {
		await APIJsonRequest(`${url}/${userId}/roles/remove`, {
			method: "DELETE",
			headers: cookies ? { Cookie: cookies } : {},
			body: JSON.stringify({
				roleNames: roles,
			}),
		})
	},

	addRolesToUser: async (
		url: string,
		userId: number,
		roles: TROLE[],
		cookies?: string,
	): Promise<TROLE[]> => {
		const response = await APIJsonRequest<TROLE[]>(
			`${url}/${userId}/roles/add`,
			{
				method: "POST",
				headers: cookies ? { Cookie: cookies } : {},
				body: JSON.stringify({
					roleNames: roles,
				}),
			},
		)

		return response as TROLE[]
	},

	patchDepartmentToUser: async (
		url: string,
		userId: number,
		department: IDepartment,
		cookies?: string,
	): Promise<void> => {
		await APIJsonRequest(`${url}/${userId}/department`, {
			method: "PATCH",
			headers: cookies ? { Cookie: cookies } : {},
			body: JSON.stringify({
				uuidDepartment: department.uuid,
			}),
		})
	},
}
