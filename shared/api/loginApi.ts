import { IRole, TROLE } from "../model/Role"
import APIJsonRequest from "./APIJsonRequest"

interface RegistrationRequest {
	login: string
	pasword: string
	organisation_name: string
}

interface LoginRequest {
	username: string
	password: string
}

interface LoginResponse {
	login: string
	roles: RoleResponse[]
	uuidDepartment: string
}

interface RoleResponse {
	id: number
	name: TROLE
}

const loginApi = {
	registerOrganization: async (data: RegistrationRequest): Promise<void> => {
		await APIJsonRequest<void>(
			`${process.env.NEXT_PUBLIC_AUTH_URL_V1}/register-organization`,
			{
				method: "POST",
				body: JSON.stringify(data),
			},
		)
	},

	login: async (data: LoginRequest) => {
		const response = await APIJsonRequest<LoginResponse>(
			`${process.env.NEXT_PUBLIC_AUTH_URL_V1}/login`,
			{
				method: "POST",
				body: JSON.stringify(data),
			},
		)

		const userRoles = response.roles.map<IRole>((role) => ({
			id: role.id,
			type: role.name,
			isEnabled: true,
		}))

		return {
			login: data.username,
			password: data.password,
			roles: userRoles,
			uuidDepartment: response.uuidDepartment,
		}
	},

	refreshAuth: async (sessionId: string): Promise<void> => {
		const response = await APIJsonRequest<void>(
			`${process.env.NEXT_PUBLIC_AUTH_URL_V1}/refresh` as string,
			{
				method: "POST",
				body: JSON.stringify({ sessionId }),
			},
		)

		return response
		// TODO:: обработать 401 и 403
	},
}

export default loginApi
