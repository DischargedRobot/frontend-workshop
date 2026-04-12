import { IDepartment } from "."

export interface IService {
	topicName: string
	username: string
	password: string
	groupName: string
}

export interface IServiceDepartment extends IService, IDepartment {}
