import { IRole } from "@/shared/Role"
import { IDepartment } from "../../Departments/lib"

export interface IUser {
    id: number
    login: string
    password: string
    roles: IRole[]
    departmentId: IDepartment['id']
}
