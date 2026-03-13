import { IDepartment } from "@/entities/DepartmentTable";
import { IUser } from "@/entities/UserCard/types";
import { IRole, TROLE } from "@/shared/Role";
import { create } from "zustand";

const API_URL = 'api/'

interface IUseStructure {
    
    users: IUser[]
    setUsers: (newUsers: IUser[]) => void

    filteredUsers: IUser[]
    setFilteredUsers: (newfilteredUsers: IUser[]) => void

    departments: IDepartment[]
    setDepartments: (newDepartments: IDepartment[]) => void

    getDepartments: () => void

}

const createIntialRoles = (): IRole[] => {
    const roles: IRole[] = [];
    for ( const [key, value] of Object.entries(TROLE)) {
        roles.push({name: key, type: value, isEnabled: false})
    }
    return roles
}

const useStructure = create<IUseStructure>((set, get) => ({

    users: [
        {login: 'L', password: 'ss', id:1, roles: createIntialRoles(), departmentId: 3},
        {login: 'rob', password: 'ss', id:2, roles: createIntialRoles(), departmentId: 4}
    ],
    setUsers: (newUsers) => set({users: newUsers}),

    filteredUsers: [
        {login: 'L', password: 'ss', id:1, roles: createIntialRoles(), departmentId: 3},
        {login: 'rob', password: 'ss', id:2, roles: createIntialRoles(), departmentId: 4}
    ],
    setFilteredUsers: (newfilteredUsers) => set({filteredUsers: newfilteredUsers}),

    departments: [],
    setDepartments: (newDepartments) => set({departments: newDepartments}),

    getDepartments: async () => {
        const response = await fetch('api/getDepartments')
        
        if (!response.ok) {
            throw new Error('Ошибка получения отделов')
        }

        return await response.json()
    },

    getUsersByDepartments: async () => {
        const response = await fetch(API_URL)

        if (!response.ok){
            throw new Error('bee users')
        }

        return await response.json()
    }
}))

export default useStructure