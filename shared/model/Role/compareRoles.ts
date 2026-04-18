import { IRole } from "./types"

type DifferentRoleAddedOrRemoved = IRole & {
	different: "added" | "removed"
}

type DifferentRoleChanged = IRole & {
	different: "changed"
	oldIsEnabled: boolean
	newIsEnabled: boolean
}

type DifferentRole = DifferentRoleAddedOrRemoved | DifferentRoleChanged

/** @desc
 * Возвращает список ролей, которые отличаются между двумя наборами.
 * Различия: добавлена роль, удалена роль, или changed - изменилось isEnabled.
 */
export function getDifferentRoles(
	oldRoles: IRole[] = [],
	newRoles: IRole[] = [],
): DifferentRole[] {
	const oldRoleMap = new Map<string, IRole>()
	const newRoleMap = new Map<string, IRole>()

	for (const role of oldRoles) oldRoleMap.set(role.name, role)
	for (const role of newRoles) newRoleMap.set(role.name, role)

	const differentRoles: DifferentRole[] = []

	// найденные или изменённые
	for (const [nameNewRole, newRole] of newRoleMap) {
		const oldRole = oldRoleMap.get(nameNewRole)
		if (!oldRole) {
			differentRoles.push({ ...newRole, different: "added" })
		} else if (oldRole.isEnabled !== newRole.isEnabled) {
			differentRoles.push({
				...newRole,
				different: "changed",
				oldIsEnabled: oldRole.isEnabled,
				newIsEnabled: newRole.isEnabled,
			})
		}
	}

	// удалённые
	for (const [nameOldRole, oldRole] of oldRoleMap) {
		if (!newRoleMap.has(nameOldRole)) {
			differentRoles.push({ ...oldRole, different: "removed" })
		}
	}

	return differentRoles
}
