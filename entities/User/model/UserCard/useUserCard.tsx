import { useCallback, useMemo, useState } from "react"
import { IRole } from "@/shared/model/Role"
import { IUser } from "../../lib/types"
import { useUserCardForm } from "./useUserCardForm"
import useUsersStore from "../useUsersStore"

export const useUserCard = (user: IUser, setUser: (user: IUser) => void) => {
	const form = useUserCardForm(user, setUser)

	const [roles, setRoles] = useState<IRole[]>(user.roles)
	const [isSelected, setIsSelected] = useState(false)

	const deleteUserById = useUsersStore((state) => state.deleteUserById)

	const changeStatusRole = useCallback((): void => {
		setRoles([...user.roles])
	}, [user.roles])

	const filterRoleList = useMemo(
		() => roles.filter((role) => role.isEnabled),
		[roles],
	)

	const toggleSelected = () => setIsSelected((prev) => !prev)

	return {
		...form,
		roles,
		setRoles,
		filterRoleList,
		isSelected,
		toggleSelected,
		deleteUserById,
		changeStatusRole,
	}
}
