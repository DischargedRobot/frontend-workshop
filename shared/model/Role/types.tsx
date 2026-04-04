export const TROLE = {
	DC: "department_create",
	DD: "department_delete",
	DU: "department_update",
	UC: "user_create",
	UD: "user_delete",
	UU: "user_update",
	FFC: "featureFlag_create",
	FFD: "featureFlag_delete",
	FFU: "featureFlag_update",
} as const

export type TROLE = (typeof TROLE)[keyof typeof TROLE]

export interface IRole {
	name: (typeof ROLE_NAMES)[keyof typeof ROLE_NAMES]
	type: TROLE
	isEnabled: boolean
}

export const ROLE_NAMES: Record<TROLE, string> = {
	[TROLE.DC]: "Создание",
	[TROLE.DD]: "Удаление",
	[TROLE.DU]: "Редактирование",

	[TROLE.UC]: "Создание",
	[TROLE.UD]: "Удаление",
	[TROLE.UU]: "Редактирование",

	[TROLE.FFC]: "Создание",
	[TROLE.FFD]: "Удаление",
	[TROLE.FFU]: "Редактирование",
}
