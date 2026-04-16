export const TROLE = {
	CE: "CREATE_EMPLOYEE_ROLE",
	RE: "READ_EMPLOYEE_ROLE",
	UE: "UPDATE_EMPLOYEE_ROLE",
	DE: "DELETE_EMPLOYEE_ROLE",

	CFF: "CREATE_FEATURE_FLAG_ROLE",
	RFF: "READ_FEATURE_FLAG_ROLE",
	UFF: "UPDATE_FEATURE_FLAG_ROLE",
	DFF: "DELETE_FEATURE_FLAG_ROLE",

	CD: "CREATE_DEPARTMENT_ROLE",
	RD: "READ_DEPARTMENT_ROLE",
	UD: "UPDATE_DEPARTMENT_ROLE",
	DD: "DELETE_DEPARTMENT_ROLE",
} as const

export type TROLE = (typeof TROLE)[keyof typeof TROLE]
export type TROLEKey = keyof typeof TROLE


type KeyByValue<T, V> = {
	[K in keyof T]: T[K] extends V ? K : never
}[keyof T]

export type TROLE_VALUE_TO_KEY = {
	[key in TROLE]: KeyByValue<typeof TROLE, key>
}

// Обратный маппинг: "DELETE_DEPARTMENT_ROLE" -> "DD"
export const TROLE_VALUE_TO_KEY = Object.fromEntries(
	Object.entries(TROLE).map(([key, value]) => [value, key]),
) as TROLE_VALUE_TO_KEY


export interface IRole {
	name: TROLEKey
	type: TROLE
	isEnabled: boolean
}

// Если ключ присутствует в объекте TROLE — это `TROLEKey`
function isTRoleKey(k: string): k is TROLEKey {
	return k in TROLE
}

export function toIRole(key: TROLEKey): IRole
export function toIRole(key: keyof TROLE_VALUE_TO_KEY): IRole
export function toIRole(key: TROLEKey | keyof TROLE_VALUE_TO_KEY): IRole {
	if (isTRoleKey(key)) {
		return {
			name: key,
			type: TROLE[key],
			isEnabled: true,
		}
	}

	// Иначе считаем, что передали значение `TROLE` 
	// и конвертируем через обратный маппинг
	return {
		name: TROLE_VALUE_TO_KEY[key],
		type: key,
		isEnabled: true,
	}
}

export type NameOfRoleAction =
	| "Создание"
	| "Просмотр"
	| "Изменение"
	| "Удаление"

export const NAMES_OF_ROLE_ACTIONS: Record<TROLE, NameOfRoleAction> = {
	[TROLE.CE]: "Создание",
	[TROLE.RE]: "Просмотр",
	[TROLE.UE]: "Изменение",
	[TROLE.DE]: "Удаление",

	[TROLE.CFF]: "Создание",
	[TROLE.RFF]: "Просмотр",
	[TROLE.UFF]: "Изменение",
	[TROLE.DFF]: "Удаление",

	[TROLE.CD]: "Создание",
	[TROLE.RD]: "Просмотр",
	[TROLE.UD]: "Изменение",
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
	[TROLE.CFF]: { action: "create", subject: "FF" },
	[TROLE.RFF]: { action: "read", subject: "FF" },
	[TROLE.UFF]: { action: "update", subject: "FF" },
	[TROLE.DFF]: { action: "delete", subject: "FF" },

	[TROLE.CD]: { action: "create", subject: "Department" },
	[TROLE.RD]: { action: "read", subject: "Department" },
	[TROLE.UD]: { action: "update", subject: "Department" },
	[TROLE.DD]: { action: "delete", subject: "Department" },

	[TROLE.CE]: { action: "create", subject: "User" },
	[TROLE.RE]: { action: "read", subject: "User" },
	[TROLE.UE]: { action: "update", subject: "User" },
	[TROLE.DE]: { action: "delete", subject: "User" },
}

export const DEFAULT_ROLES: IRole[] = Object.entries(TROLE).map(
	([key, value]) => ({
		name: key as TROLEKey,
		type: value,
		isEnabled: false,
	}),
)
