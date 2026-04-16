"use client"

import {
	useFilteredUsers,
	useUsersStore,
	useUserFiltersStore,
} from "@/entities/User"

export const useFullUserList = () => {
	const users = useUsersStore((state) => state.users)
	const setUser = useUsersStore((state) => state.setUser)

	const filteredUsers = useFilteredUsers(users)

	const setLogin = useUserFiltersStore((state) => state.setLogin)
	return {
		users: filteredUsers,
		setUser,
		setLogin,
	}
}
