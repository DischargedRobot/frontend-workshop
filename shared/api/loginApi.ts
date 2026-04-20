import { IProfile } from "@/entities/Profile"
import { IRole, TROLE } from "../model/Role"
import APIJsonRequest from "./APIJsonRequest"
import { TROLE_VALUE_TO_KEY } from "../model/Role/types"

interface RegistrationRequest {
	login: string
	password: string
	organization_name: string
}

interface LogInRequest {
	username: string
	password: string
}

interface LogInResponse {
	id: number
	login: string
	roles: RoleResponse[]
	uuidDepartament: string
}

interface GetMeResponse {
	id: number
	login: string
	password: string
	roles: string[]
	uuidDepartament: string
	settings?: object
}

interface RoleResponse {
	id: number
	name: TROLE
}

interface IPatchProfileRequest {
	oldPassword: string
	newLogin?: string
	newPassword?: string
}

const AUTH_URL = process.env.NEXT_PUBLIC_AUTH_URL_V1
const CLIENT_URL = process.env.NEXT_PUBLIC_CLIENT_URL_V1
// В shared т.к. часто используется другими
const loginApi = {
	registerOrganization: async (data: RegistrationRequest): Promise<void> => {
		await APIJsonRequest<void>(`${AUTH_URL}/register-organization`, {
			method: "POST",
			body: JSON.stringify(data),
		})
	},

	logIn: async (data: LogInRequest) => {
		const response = await APIJsonRequest<LogInResponse>(
			`${AUTH_URL}/login`,
			{
				method: "POST",
				body: JSON.stringify(data),
			},
		)

		const userRoles = response.roles.map<IRole>((role) => ({
			name: TROLE_VALUE_TO_KEY[role.name],
			type: role.name,
			isEnabled: true,
		}))

		return {
			login: data.username,
			password: data.password,
			roles: userRoles,
			uuidDepartment: response.uuidDepartament,
		}
	},

	logOut: async (): Promise<void> => {
		await APIJsonRequest<void>(`${AUTH_URL}/logout`, { method: "POST" })
	},

	refreshAuth: async (sessionId: string): Promise<void> => {
		await APIJsonRequest<void>(`${AUTH_URL}/refresh`, {
			method: "POST",
			body: JSON.stringify({ sessionId }),
		})
	},

	getMe: async (
		cookiesString?: string,
	): Promise<Omit<IProfile, "departmentId"> & { uuidDepartment: string }> => {
		const response = await APIJsonRequest<GetMeResponse>(
			`${CLIENT_URL}/me`,
			{
				headers: cookiesString ? { Cookie: cookiesString } : {},
				cache: "no-store", // т.к. вызываем на сервере иногда
			},
		)

		return {
			departmentName: "", // т.к. на фронте по uuid департамента получаем имя, а на бэке его нет
			login: response.login,
			password: response.password,
			roles: response.roles.map((role) => ({
				name: TROLE_VALUE_TO_KEY[role as TROLE],
				type: role as TROLE,
				isEnabled: true,
			})),
			uuidDepartment: response.uuidDepartament,
			settings: response.settings,
		}
	},

	patchMe: async (data: IPatchProfileRequest): Promise<void> => {
		await APIJsonRequest<void>(`${CLIENT_URL}/me`, {
			method: "PATCH",
			body: JSON.stringify(data),
		})
	},

	registerUser: async (
		data: {
			login: string
			password: string
		},
		token: string,
	): Promise<void> => {
		await APIJsonRequest<void>(
			`${AUTH_URL}/register-employee?token=${token}`,
			{
				method: "POST",
				body: JSON.stringify(data),
			},
		)
	},

	generateInvite: async (
		userRoles: IRole[] = [],
		uuidDepartment: string,
	): Promise<string> => {
		const roles = userRoles.map((role) => role.type)

		const response = await APIJsonRequest<{ inviteToken: string }>(
			`${AUTH_URL}/generate-invite`,
			{
				method: "POST",
				body: JSON.stringify({
					roles,
					uuidDepartament: uuidDepartment,
				}),
			},
		)
		return response.inviteToken
	},
}

export const ConverterRoleRespToIRol = (roles: RoleResponse[]): IRole[] => {
	return roles.map<IRole>((role) => ({
		name: TROLE_VALUE_TO_KEY[role.name],
		type: role.name,
		isEnabled: true,
	}))
}

export default loginApi
