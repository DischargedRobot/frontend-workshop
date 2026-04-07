import { IFeatureFlag } from "@/entities/FF"

export interface Department {
	id: number
	name: string
	children?: Department[]
	featureFlags?: IFeatureFlag[]
	path: string
}

export interface IDepartment {
	id: number
	name: string
	children: IDepartment[]
	featureFlags: IFeatureFlag[]
	path: string
	version: number
	isService: boolean
	uuid?: string
}
