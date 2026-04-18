export interface ChangeProfilePersonalDataForm {
	login: string
	currentPassword: string
	password?: string
	confirm?: string
}

export type ChangeProfilePersonalDataSave = {
	login: string
	password?: string
}
