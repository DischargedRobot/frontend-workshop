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
	console.log("users in model", users, filteredUsers)

	const setLogin = useUserFiltersStore((state) => state.setLogin)
	return {
		users: filteredUsers,
		setUser,
		setLogin,
	}
}
