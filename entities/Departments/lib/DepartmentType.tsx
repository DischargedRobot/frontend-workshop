import { IFeatureFlag } from "../../FFT/ui/FFTable"

export interface Department {
	id: number
	name: string
	children?: Department[]
	featureFlags?: IFeatureFlag[]
	link: string
}

export interface IDepartment {
	id: number
	name: string
	children: IDepartment[]
	featureFlags: IFeatureFlag[]
	link: string
	version: number
	isService: boolean
}
