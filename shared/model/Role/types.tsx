export const TROLE = {
	DC: "CREATE_DEPARTMENT_ROLE",
	DR: "READ_DEPARTMENT_ROLE",
	DU: "UPDATE_DEPARTMENT_ROLE",
	DD: "DELETE_DEPARTMENT_ROLE",

	EC: "CREATE_EMPLOYEE_ROLE",
	ER: "READ_EMPLOYEE_ROLE",
	EU: "UPDATE_EMPLOYEE_ROLE",
	ED: "DELETE_EMPLOYEE_ROLE",

	FFC: "CREATE_FEATURE_FLAG_ROLE",
	FFR: "READ_FEATURE_FLAG_ROLE",
	FFU: "UPDATE_FEATURE_FLAG_ROLE",
	FFD: "DELETE_FEATURE_FLAG_ROLE",
} as const

export type TROLE = (typeof TROLE)[keyof typeof TROLE]

export interface IRole {
	id: number
	type: TROLE
	isEnabled: boolean
}

export type NameOfRoleAction =
	| "Создание"
	| "Просмотр"
	| "Редактирование"
	| "Удаление"

export const NAMES_OF_ROLE_ACTIONS: Record<TROLE, NameOfRoleAction> = {
	[TROLE.DC]: "Создание",
	[TROLE.DR]: "Просмотр",
	[TROLE.DU]: "Редактирование",
	[TROLE.DD]: "Удаление",

	[TROLE.EC]: "Создание",
	[TROLE.ER]: "Просмотр",
	[TROLE.EU]: "Редактирование",
	[TROLE.ED]: "Удаление",

	[TROLE.FFC]: "Создание",
	[TROLE.FFR]: "Просмотр",
	[TROLE.FFU]: "Редактирование",
	[TROLE.FFD]: "Удаление",
}
