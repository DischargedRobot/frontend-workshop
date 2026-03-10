import { Department } from "@/entities/DepartmentTable/DepartmentTableType";
import { FeatureFlag } from "@/entities/FFTable/FFTable";
import { create } from "zustand";



interface IUseFFMenu {
    // TODO:: вот это перенести в пейджес
    departments: Department[]
    setDepartments: (departments: Department[]) => void

    featureFlags: FeatureFlag[]
    setFeatureFlags: (featureFlags: FeatureFlag[]) => void

    isHidden: boolean
    setIsHidden: (isHidden: boolean) => void

    // TODO:: вот это перенести в пейджес
    getDepartmentsByPath: (path: string) => Promise<Department[]>
    getFeatureFlagsByDepartments: (departments: Department[]) => Promise<FeatureFlag[]>
    toDepartment: (path: string) => Promise<{featureFlags: FeatureFlag[]; departments: Department[]}>
}

export const useFFMenu = create<IUseFFMenu>( (set, get) => ({

    isHidden: false,
    setIsHidden: (value) => set({isHidden: !value}),
    // TODO: переделать после обсуждения с бекендом
    departments: [], 
    setDepartments: (newDepartments) => set({departments: newDepartments}),

    featureFlags: [],
    setFeatureFlags: (newFeatureFlags) => set({featureFlags: newFeatureFlags}),

    // TODO:: жду бекенд, чтобы допилить
    getDepartmentsByPath: async (path) => {
        const response = await fetch(`${path}`,{
            method: 'GET',
            headers: {'Content-type': 'aplication/json'},
        })

        if (!response.ok) {
            throw new Error()
        }

        return await response.json()
    },

    getFeatureFlagsByDepartments: async (departments) => {
        const response = await fetch(`url`,{
            method: 'POST',
            headers: {'Content-type': 'aplication/json'},
            body: `${JSON.stringify(departments)}`
        })

        return await response.json()
    },

    toDepartment: async (path) => {
         const departments = await get().getDepartmentsByPath(path)
         const featureFlags = await get().getFeatureFlagsByDepartments(departments)
         return {featureFlags, departments}
    },
        
}))