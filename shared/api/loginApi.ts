import { IRole, TROLE } from "../model/Role"
import APIJsonRequest from "./APIJsonRequest"

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
	login: string
	roles: RoleResponse[]
	uuidDepartament: string
}

interface RoleResponse {
	id: number
	name: TROLE
}

// В shared т.к. часто используется другими
const loginApi = {
	registerOrganization: async (data: RegistrationRequest): Promise<void> => {
		try {
			await APIJsonRequest<void>(
				`${process.env.NEXT_PUBLIC_AUTH_URL_V1}/register-organization`,
				{
					method: "POST",
					body: JSON.stringify(data),
				},
			)
		} catch (error) {}
	},

	logIn: async (data: LogInRequest) => {
		const response = await APIJsonRequest<LogInResponse>(
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
			uuidDepartment: response.uuidDepartament,
		}
	},

	logOut: async (): Promise<void> => {
		await APIJsonRequest<void>(
			`${process.env.NEXT_PUBLIC_AUTH_URL_V1}/logout`,
			{ method: "POST" },
		)
	},

	refreshAuth: async (sessionId: string): Promise<void> => {
		await APIJsonRequest<void>(
			`${process.env.NEXT_PUBLIC_AUTH_URL_V1}/refresh`,
			{
				method: "POST",
				body: JSON.stringify({ sessionId }),
			},
		)
	},
}

export default loginApi
