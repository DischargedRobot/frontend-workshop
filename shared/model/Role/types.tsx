export const TROLE = {
	EC: "CREATE_EMPLOYEE_ROLE",
	ER: "READ_EMPLOYEE_ROLE",
	EU: "UPDATE_EMPLOYEE_ROLE",
	ED: "DELETE_EMPLOYEE_ROLE",

	FFC: "CREATE_FEATURE_FLAG_ROLE",
	FFR: "READ_FEATURE_FLAG_ROLE",
	FFU: "UPDATE_FEATURE_FLAG_ROLE",
	FFD: "DELETE_FEATURE_FLAG_ROLE",

	DC: "CREATE_DEPARTMENT_ROLE",
	DR: "READ_DEPARTMENT_ROLE",
	DU: "UPDATE_DEPARTMENT_ROLE",
	DD: "DELETE_DEPARTMENT_ROLE",
} as const

export type TROLE = (typeof TROLE)[keyof typeof TROLE]
export type TROLEKey = keyof typeof TROLE

// Обратный маппинг: "DELETE_DEPARTMENT_ROLE" -> "DD"
export const TROLE_VALUE_TO_KEY = Object.fromEntries(
	Object.entries(TROLE).map(([key, value]) => [value, key]),
) as Record<TROLE, TROLEKey>

export interface IRole {
	name: TROLEKey
	type: TROLE
	isEnabled: boolean
}

export type NameOfRoleAction =
	| "Создание"
	| "Просмотр"
	| "Изменение"
	| "Удаление"

export const NAMES_OF_ROLE_ACTIONS: Record<TROLE, NameOfRoleAction> = {
	[TROLE.EC]: "Создание",
	[TROLE.ER]: "Просмотр",
	[TROLE.EU]: "Изменение",
	[TROLE.ED]: "Удаление",

	[TROLE.FFC]: "Создание",
	[TROLE.FFR]: "Просмотр",
	[TROLE.FFU]: "Изменение",
	[TROLE.FFD]: "Удаление",

	[TROLE.DC]: "Создание",
	[TROLE.DR]: "Просмотр",
	[TROLE.DU]: "Изменение",
	[TROLE.DD]: "Удаление",
}

// Маппинг ролей на действия и субъекты для CASL Ability
export const ROLE_ABILITY_MAP: Record<
	TROLE,
	{
		action: "create" | "read" | "update" | "delete"
		subject: "FF" | "Department" | "User"
	}
> = {
	[TROLE.FFC]: { action: "create", subject: "FF" },
	[TROLE.FFR]: { action: "read", subject: "FF" },
	[TROLE.FFU]: { action: "update", subject: "FF" },
	[TROLE.FFD]: { action: "delete", subject: "FF" },

	[TROLE.DC]: { action: "create", subject: "Department" },
	[TROLE.DR]: { action: "read", subject: "Department" },
	[TROLE.DU]: { action: "update", subject: "Department" },
	[TROLE.DD]: { action: "delete", subject: "Department" },

	[TROLE.EC]: { action: "create", subject: "User" },
	[TROLE.ER]: { action: "read", subject: "User" },
	[TROLE.EU]: { action: "update", subject: "User" },
	[TROLE.ED]: { action: "delete", subject: "User" },
}

export const DEFAULT_ROLES: IRole[] = Object.entries(TROLE).map(
	([key, value]) => ({
		name: key as TROLEKey,
		type: value,
		isEnabled: false,
	}),
)
