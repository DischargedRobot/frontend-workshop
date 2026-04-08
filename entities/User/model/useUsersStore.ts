import { IUser } from "@/entities/User/lib/types"
import { IRole, TROLE } from "@/shared/model/Role"
import { create } from "zustand"

interface IUseUsers {
	users: IUser[]
	setUsers: (newUsers: IUser[]) => void
	setUser: (newDataOfUser: IUser) => void

	filteredUsers: IUser[]
	setFilteredUsers: (newfilteredUsers: IUser[]) => void
	deleteUserById: (userId: number) => void
}

const createIntialRoles = (): IRole[] => {
	const roles: IRole[] = []
	for (const value of Object.values(TROLE)) {
		roles.push({ name: "DC", type: value, isEnabled: false })
	}
	return roles
}
const dep = { id: 1, name: "d", children: [], featureFlags: [], link: "" }

const useUsersStore = create<IUseUsers>((set, get) => ({
	users: [],
	setUsers: (users) => set({ users }),
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

	filteredUsers: [],
	setFilteredUsers: (filteredUsers) => set({ filteredUsers }),
}))

export default useUsersStore
