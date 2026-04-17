import { IRole } from "@/shared/model/Role"
import { IDepartment } from "../../Departments/lib"

export interface IUser {
	id: number
	login: string
	roles: IRole[]
	department: IDepartment
}
