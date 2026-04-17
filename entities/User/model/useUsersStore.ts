import { IUser } from "@/entities/User/lib/types"
import { IRole, TROLE } from "@/shared/model/Role"
import { create } from "zustand"

interface IUseUsers {
	users: IUser[]
	setUsers: (newUsers: IUser[]) => void
	addUsers: (newUsers: IUser[]) => void
	setUser: (newDataOfUser: IUser) => void

	filteredUsers: IUser[]
	setFilteredUsers: (newfilteredUsers: IUser[]) => void
	deleteUserById: (userId: number) => void
	deleteUsersByDepartmentId: (departmentId: number) => void
}

// const createIntialRoles = (): IRole[] => {
// 	const roles: IRole[] = []
// 	for (const value of Object.values(TROLE)) {
// 		roles.push({ name: "DC", type: value, isEnabled: false })
// 	}
// 	return roles
// }
// const dep = { id: 1, name: "d", children: [], featureFlags: [], link: "" }

// TODO: разделить на 2 стора
const useUsersStore = create<IUseUsers>((set, get) => ({
	users: [],
	setUsers: (users) => set({ users }),
	addUsers: (newUsers) => {
		const newUniqUsers = newUsers.filter(
			(u) => !get().users.some((existing) => existing.id === u.id),
		)
		if (newUniqUsers.length === 0) return
		set((state) => ({ users: [...state.users, ...newUniqUsers] }))
	},
	setUser: (newUser) =>
		set((state) => ({
			users: state.users.map((user) =>
				user.id == newUser.id ? { ...user, ...newUser } : user,
			),
		})),
	deleteUserById: (idDeletedUser: number) =>
		set(() => {
			return {
				users: get().users.filter((user) => user.id != idDeletedUser),
			}
		}),
	deleteUsersByDepartmentId: (departmentId: number) =>
		set((state) => ({
			users: state.users.filter(
				(user) => user.department.id !== departmentId,
			),
		})),

	filteredUsers: [],
	setFilteredUsers: (filteredUsers) => set({ filteredUsers }),
}))

export default useUsersStore
