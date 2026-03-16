import { IUser } from "@/entities/UserCard/ui/types";
import { IRole, TROLE } from "@/shared/Role";
import { create } from "zustand";

interface IUseUsers {
    users: IUser[]
    setUsers: (newUsers: IUser[]) => void
    setUser: (newDataOfUser: IUser) => void

    filteredUsers: IUser[]
    setFilteredUsers: (newfilteredUsers: IUser[]) => void
    deleteUserById: (userId: number) => void
}

const createIntialRoles = (): IRole[] => {
    const roles: IRole[] = [];
    for ( const [key, value] of Object.entries(TROLE)) {
        roles.push({name: key, type: value, isEnabled: false})
    }
    return roles
}
const dep = {id: 1, name: 'd', children: [], featureFlags: [], link: ''}

const useUsersStore = create<IUseUsers>((set, get) => ({

    users: [
        {login: 'L', password: 'ss', id:1, roles: createIntialRoles(), departmentId: dep.id},
        {login: 'rob', password: 'ss', id:2, roles: createIntialRoles(), departmentId: dep.id}
    ],
    setUsers: (users) => set({users}),
    setUser: (newUser) => set(() => ({users: get().users.map(user => (user.id == newUser.id ? {...user, ...newUser}: user ))})),
    deleteUserById: (idDeletedUser: number) => set(() => {
        return {users: get().users.filter(user => user.id != idDeletedUser)}
    }),

    filteredUsers: [
        {login: 'L', password: 'ss', id:1, roles: createIntialRoles(), departmentId: dep.id},
        {login: 'rob', password: 'ss', id:2, roles: createIntialRoles(), departmentId: dep.id}
    ],
    setFilteredUsers: (filteredUsers) => set({filteredUsers}),


}))

export default useUsersStore