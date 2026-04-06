import { IRole } from "@/shared/model/Role"

export interface IProfile {
	id: number
	login: string
	password: string
	departmentId?: number
	roles: IRole[]
	settings?: object
}
