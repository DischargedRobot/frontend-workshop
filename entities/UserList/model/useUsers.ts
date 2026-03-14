import { IUser } from "@/entities/UserCard/types";
import { IRole, TROLE } from "@/shared/Role";
import { create } from "zustand";

interface IUseUsers {
    users: IUser[]
    setUsers: (newUsers: IUser[]) => void

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

const useUsers = create<IUseUsers>((set, get) => ({

    users: [
        {login: 'L', password: 'ss', id:1, roles: createIntialRoles(), departmentId: 3},
        {login: 'rob', password: 'ss', id:2, roles: createIntialRoles(), departmentId: 4}
    ],
    setUsers: (users) => set({users}),
    deleteUserById: (idDeletedUser: number) => set(() => {
        return {users: get().users.filter(user => user.id != idDeletedUser)}
    }),

    filteredUsers: [
        {login: 'L', password: 'ss', id:1, roles: createIntialRoles(), departmentId: 3},
        {login: 'rob', password: 'ss', id:2, roles: createIntialRoles(), departmentId: 4}
    ],
    setFilteredUsers: (filteredUsers) => set({filteredUsers}),


}))

export default useUsers