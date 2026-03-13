import { IDepartment } from "@/entities/DepartmentTable";
import { IUser } from "@/entities/UserCard/types";
import { create } from "zustand";

const API_URL = 'api/'

interface IUseStructure {
    users: IUser[]
    setUsers: (newUsers: IUser[]) => void

    departments: IDepartment[]
    setDepartments: (newDepartments: IDepartment[]) => void

    getDepartments: () => void
}

const useStructure = create<IUseStructure>((set, get) => ({

    users: [],
    setUsers: (items) => set({users: items}),

    departments: [],
    setDepartments: (items) => set({departments: items}),

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