import { IRole } from "@/shared/model/Role"

export interface IProfile {
	login: string
	password?: string
	departmentId?: number
	roles: IRole[]
	settings?: object
	departmentName: string
}
