import { useCallback, useMemo, useState } from "react"
import { getDifferentRoles, IRole } from "@/shared/model/Role"
import { IUser } from "../../lib/types"
import useUsersStore from "../useUsersStore"
import { IDepartment, useDepartmentsStore } from "@/entities/Departments"
import useDeleteUser from "./useDeleteUser"
import { userApiClient } from "../../api"
import { useAPIErrorHandler } from "@/shared/api/APIErrorHandler"
import { useShallow } from "zustand/shallow"
import { showToast } from "@/shared/ui"
import { mapAPIErrors } from "@/shared/api"


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

	// вызывается при клике на роль в листе ролей
	// принимает только активные роли
	const changeStatusRole = useCallback((enabledRoles: IRole[]): void => {
		const enabledTypes = enabledRoles.map(role => role.type)
		const base = user.roles
		// console.log("changeStatusRole", { enabledRoles, base })
		const updated = base.map(role => ({ ...role, isEnabled: enabledTypes.includes(role.type) }))
		setRoles(updated)
	}, [user.roles])

	// Роли для списка под перснальными данными в карточке
	const filterRoleList = useMemo(() => roles.filter((role) => role.isEnabled), [roles])

	// переименуем (так красивше просто)
	const toggleSelected = () => setIsSelected((prev) => !prev)

	// Проверка, что правок не было
	const isDirty = useMemo(() => {
		return (
			userDepartment?.id !== (user.department.id ?? null) ||
			!areRolesEqual(roles, user.roles || [])
		)
	}, [userDepartment, user.department, roles, user.roles])
	// console.log("useUsercard", userDepartment?.id !== (user.department.id ?? null) ||
	// 	!areRolesEqual(roles, user.roles || []),
	// 	{ userId: user.id, dept: userDepartment?.id, userDept: user.department.id, roles, userRoles: user.roles })

	const errorHandler = useCallback(() => {
		showToast({ type: "error", text: "Пльзователя с таким айди не существует" })
	}, [])
	const errorHandlers = useMemo(
		() => [
			{
				error: mapAPIErrors(404),
				handler: errorHandler,
			},
		],
		[errorHandler],
	)
	const handleErrorDeleteRole = useAPIErrorHandler(errorHandlers)
	const handleErrorAddRole = useAPIErrorHandler(errorHandlers)

	const saveData = async () => {
		// массивы ролей 100% совпдают по размеру и содержимому, только значения включения разное
		const diffRoles = getDifferentRoles(user.roles, roles)

		// проверка департмаента
		if (!!userDepartment && userDepartment.id !== (user.department.id ?? null)) {
			try {
				await userApiClient.patchDepartmentToUser(user.id, userDepartment)
				setUser({ ...user, department: userDepartment ?? user.department })
			} catch (err) {
				handleErrorDeleteRole(err)
				return
			}
		}

		// Делаем в 2 захода изменение ролей, чтобы не откатывать всё, 
		// а просто изменить то, что уже изменено
		// сначлача удаляем и устанавливаем
		let rolesAfterDeletion: IRole[] = []
		const deletedRoles = diffRoles.filter(role => role.different === "changed" && role.newIsEnabled === false)
		if (deletedRoles.length) {
			try {
				await userApiClient.deleteRolesFromUser(user.id, deletedRoles.map(role => role.type))
				const deletedTypes = deletedRoles.map(r => r.type)
				rolesAfterDeletion = (user.roles).map(r =>
					deletedTypes.includes(r.type) ? { ...r, isEnabled: false } : r,
				)
				setUser({ ...user, department: userDepartment ?? user.department, roles: rolesAfterDeletion })
			} catch (err) {
				handleErrorDeleteRole(err)
				return
			}
		}

		// потом добавляем и устаналиваем
		const addedRoles = diffRoles.filter(role => role.different === "changed" && role.newIsEnabled === true)
		if (addedRoles.length) {
			try {
				await userApiClient.addRolesToUser(user.id, addedRoles.map(role => role.type))
				const addedTypes = addedRoles.map(r => r.type)
				const afterAddition = (rolesAfterDeletion.length ? rolesAfterDeletion : user.roles).map(r =>
					addedTypes.includes(r.type) ? { ...r, isEnabled: true } : r,
				)
				setUser({ ...user, department: userDepartment ?? user.department, roles: afterAddition })
			} catch (err) {
				handleErrorAddRole(err)
				return
			}
		}
	}

	const resetData = () => {
		setUserDepartment(user.department ?? null)
		setRoles([...user.roles])
	}


	const departments = useDepartmentsStore(useShallow(
		(state) => state.getDepartmentsIncludingAllChildrenWithoutRoot(),
	))

	return {
		isDirty,
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
		departments,
	}
}
