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
const data: Department[] = [
  {
    id: 1,
    name: 'Depart1',
    link: '12312',
  },
  {
    id: 2,
    name: 'Depart2',
    link: '#!',    
  },
  {
    id: 3,
    name: 'Depart3',
    link: '#!',
  },  {
    id: 4,
    name: 'Depart1',
    link: '12312',   
  },
  {
    id: 5,
    name: 'Depart2',
    link: '#!', 
  },
  {
    id: 6,
    name: 'Depart3',
    link: '#!', 
  },  {
    id: 7,
    name: 'Depart1',
    link: '12312', 
  },
  {
    id: 8,
    name: 'Depart2',
    link: '#!', 
  },
  {
    id: 9,
    name: 'Depart3',
    link: '#!', 
  },  {
    id: 10,
    name: 'Depart1',
    link: '12312',
  }
];

const createData = (number: number) : FeatureFlag[] => {
    return Array.from(({length: number}), (_, index) => ({
        id: index,
        name: `FF${index}`,
        departmentName: `Depart${index}`,
        isEnabled: false ,
        description: 'd'.repeat(index),
        lastModified: '11.11.2022'
    }))
}

export const useFFMenu = create<IUseFFMenu>( (set, get) => ({

    isHidden: false,
    setIsHidden: (value) => set({isHidden: !value}),
    
    path: ["dep1","dep1.1","dep1.1.1","dep1.1.1.1",],
    setPath: (v) => set({path: v}),
    
    // TODO: переделать после обсуждения с бекендом
    departments: data, 
    setDepartments: (newDepartments) => set({departments: newDepartments}),

    featureFlags: createData(10),
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
            const newFeatureFlags = await get().getFeatureFlagsByDepartments(newDepartments)
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