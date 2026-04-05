export interface IFeatureFlag {
	id: number
	name: string
	departmentId: number
	departmentName?: string
	value: boolean
	lastModified?: string
	description?: string
	version: number
}
