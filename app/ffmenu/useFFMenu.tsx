import { Department } from "@/entities/DepartmentTable/DepartmentTableType";
import { FeatureFlag } from "@/entities/FFTable/FFTable";
import { create } from "zustand";



interface IUseFFMenu {

    path: string[]
    setPath: (v: string[]) => void,
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
    toDepartment: (path: string) => void
}

export const useFFMenu = create<IUseFFMenu>( (set, get) => ({

    isHidden: false,
    setIsHidden: (value) => set({isHidden: !value}),
    
    path: ["dep1","dep1.1","dep1.1.1","dep1.1.1.1",],
    setPath: (v) => set({path: v}),
    
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
            throw new Error('getDepartmentsByPath')
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
        try {
            const newDepartments = await get().getDepartmentsByPath(path)
            const newFeatureFlags = await get().getFeatureFlagsByDepartments(departments)
            set({
                featureFlags: newFeatureFlags, 
                departments: newDepartments,
            })
        }
        catch {
            throw new Error('toDepartmentError')
        }        
    }
        
}))