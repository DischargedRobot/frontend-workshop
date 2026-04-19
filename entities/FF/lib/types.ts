export interface IToggleFF {
	isToggling?: boolean
}
export interface IFeatureFlag extends IToggleFF {
	id: number
	name: string
	departmentId: number
	departmentName?: string
	value: boolean
	lastModified?: string
	description?: string
	version: number
}
