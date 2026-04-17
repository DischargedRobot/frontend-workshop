import { useCallback, useMemo, useState } from "react"
import { IRole } from "@/shared/model/Role"
import { IUser } from "../../lib/types"
import useUsersStore from "../useUsersStore"
import { IDepartment } from "@/entities/Departments"
import useDeleteUser from "./useDeleteUser"


export const areRolesEqual = (aRoles: IRole[], bRoles: IRole[]) => {
	if (aRoles.length !== bRoles.length) return false
	const mapB = new Map(bRoles.map(bRole => [bRole.type, bRole.isEnabled]))
	return aRoles.every(aRole => mapB.get(aRole.type) === aRole.isEnabled)
}

export const useUserCard = (user: IUser, setUser: (user: IUser) => void) => {
	const [roles, setRoles] = useState<IRole[]>(() => [...(user.roles || [])])
	const [userDepartment, setUserDepartment] = useState<IDepartment | null>(user.department ?? null)
	const [isSelected, setIsSelected] = useState(false)

	// Удаление пользователя (вынесено в хук)
	const deleteUser = useDeleteUser({
		userId: user.id,
	})


	const changeStatusRole = useCallback((): void => {
		setRoles([...user.roles])
	}, [user.roles])

	// Роли для списка под перснальными данными в карточке
	const filterRoleList = useMemo(() => roles.filter((role) => role.isEnabled), [roles])

	// переименуем (так красивше просто)
	const toggleSelected = () => setIsSelected((prev) => !prev)

	// Проверка, что правко не было
	const isDirty = useMemo(() => {
		return (
			userDepartment?.id !== (user.department.id ?? null) ||
			!areRolesEqual(roles, user.roles || [])
		)
	}, [userDepartment, user.department, roles, user.roles])
	// console.log("useUsercard", userDepartment?.id !== (user.department.id ?? null) ||
	// 	!areRolesEqual(roles, user.roles || []),
	// 	{ userId: user.id, dept: userDepartment?.id, userDept: user.department.id, roles, userRoles: user.roles })

	const saveData = () => {

		setUser({ ...user, department: userDepartment ?? user.department, roles: [...roles] })
	}

	const resetData = () => {
		setUserDepartment(user.department ?? null)
		setRoles([...user.roles])
	}

	return {
		register: () => ({}),
		handleSubmit: (fn: () => void) => fn,
		errors: {},
		isDirty,
		control: undefined,
		saveData,
		resetData,
		roles,
		setRoles,
		filterRoleList,
		isSelected,
		toggleSelected,
		deleteUser,
		changeStatusRole,
		userDepartment,
		setUserDepartment,
	}
}
