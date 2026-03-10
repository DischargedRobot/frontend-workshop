import { create } from "zustand"


interface IUseDepartment {
// TODO: переделать после обсуждения с бекендом

    departments: string[]
    featureFlags: string[]

    isHidden: boolean
    setIsHidden: (isHidden: boolean) => void

    getDepartmentsByPath: (path: string) => Promise<string[]>
    getFeatureFlagsByDepartments: (departments: string[]) => Promise<string[]>
    toDepartment: (path: string) => Promise<{featureFlags: string[]; departments: string[]}>

}

export const useDepartment = create<IUseDepartment>((set, get) => ({

    isHidden: false,
    setIsHidden: (value) => set({isHidden: !value}),
// TODO: переделать после обсуждения с бекендом
    departments: [''], 
    featureFlags: [''],
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