import { IRole } from "@/shared/Role"
import { IDepartment } from "../DepartmentTable"

export interface IUser {
    id: number
    login: string
    password: string
    roles: IRole[]
    departmentId: IDepartment['id']
}
