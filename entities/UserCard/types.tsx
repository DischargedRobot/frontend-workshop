import { IRole } from "@/shared/Role"

export interface IUser {
    id: number
    login: string
    password: string
    roles: IRole[]
}
