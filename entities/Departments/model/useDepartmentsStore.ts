import { create } from "zustand";
import { IDepartment } from "../lib"; 
import { useUserFiltersStore } from "@/entities/UserList/model";
import { Department } from "../lib/DepartmentType";

const InitialDepartments: IDepartment[] = (() => {
  const depts: IDepartment[] = []
  
  for (let i = 0; i < 5; i++) {
    depts.push({
      id: i,
      name: `Department ${i}`,
      children: [],
      featureFlags: [],
      link: '',
      isService: false,
      version: 1
    })
  }
  
  for (let i = 0; i < depts.length - 1; i++) {
    depts[i].children = [depts[i + 1]]
  }
  
  return [depts[0]] 
})()

interface IUseDepartments {
    departments: IDepartment[]
    setDepartments: (newDepartments: IDepartment[]) => void

    selectedDepartmentIds: number[]
    setSelectedDepartmentIds: (newSelectedDepartmentIds: number[]) => void

    removeSelectedDepartment: () => void

    removeDepartment: (department: IDepartment) => void
    addDepartment: (department: IDepartment) => void
    changeDepartmentName: (department: IDepartment, newName: string) => void
    changeDepartment: (department: IDepartment) => void
    changeDepartmentChildren: (dep: IDepartment, children: IDepartment[]) => void
    getDepartmentsIncludingAllChildren: () => IDepartment[]
    getDepartmentsByPath: (path: string) => void
    getFeatureFlagsByDepartments: (departments: IDepartment[]) => void
    // toDepartment: (path: string) => void
}

const getDepartmentAndAllChildren = (departments: IDepartment[]): IDepartment[] => {
    return departments.reduce((allDepartments: IDepartment[], department: IDepartment) => {
        allDepartments.push(department)

        if (department.children.length != 0) {
            allDepartments.push(...getDepartmentAndAllChildren(department.children))
        }

        return allDepartments
    }, [])
}

//TODO: подумать над удалением и добавлением отделов

const removeDep = (departments: IDepartment[], removedDepartmentIds: number[]): IDepartment[] => {
    return departments.filter((department) => {
        department.children = removeDep(department.children, removedDepartmentIds)

        return (!removedDepartmentIds.includes(department.id))
    })
}

// const updateDep = (departments: IDepartment[], newDepartment: IDepartment): IDepartment => {
//     console.log('update',  departments, newDepartment)
//     return departments.map(department => {
//         if (department.id === newDepartment.id) {
//             return {...newDepartment}
//         }
//         updateDep(department.children, newDepartment)
//         return department
//     })
// }

const updateDep = (departments: IDepartment[], newDepartment: IDepartment): IDepartment[] => {
    return departments.map(department => {
        if (department.id === newDepartment.id) {
            return {...newDepartment}
        }
        if (department.children.length !== 0) {
            const updatedDepartments = updateDep(department.children, newDepartment)
            if (updatedDepartments !== department.children) {
                return {...department, children: updatedDepartments}
            }
        }
        return department
    })
}

const useDepartmentsStore = create<IUseDepartments>((set, get) => ({
    
    departments: [],
    setDepartments: (newDepartments) => set({departments: newDepartments}),
  
    selectedDepartmentIds: [],
    setSelectedDepartmentIds: (newSelectedDepartments) => set({selectedDepartmentIds: newSelectedDepartments}),

// TODO: сделать независимым от друго стора, передавая через аргс, предусмотреть, что удаляемые департаменты сидят в дочках
    removeSelectedDepartment: () => {
        console.log(removeDep(get().departments, useUserFiltersStore.getState().departmentIds),useUserFiltersStore.getState().departmentIds, 'selected')
        set((state) => ({departments: removeDep(state.departments, useUserFiltersStore.getState().departmentIds)}))
        useUserFiltersStore.getState().setDepartmentIds([])
    },

    // в теории, тут можно и по ссылке, но на всякий по id
    removeDepartment: (removingDepartment) => {
        set((state) => ({departments: state.departments.filter(department => department.id != removingDepartment.id)}))
    },

    addDepartment: (department) => {
        set((state) => ({departments: [...state.departments, department]}))
    },

    changeDepartmentName: (department, newName) => {
        set(state => ({departments: state.departments.map(dep => 
            dep.id === department.id 
                ? { ...dep, name: newName }
                : dep
        )}))
    },

    changeDepartment: (department: IDepartment) => {
        // set(state => ({departments: [...state.departments.map(dep => 
        //     dep.id === department.id 
        //         ? { ...dep, children: children }
        //         : dep
        // )]}))
        set(state => ({departments: updateDep(state.departments
        , {...department})}))
    },

    changeDepartmentChildren: (department: IDepartment, children: IDepartment[]) => {
        set(state => ({departments: updateDep(
            state.departments, 
            {...department, children: children}
        )}))
    },


    getDepartmentsIncludingAllChildren: () => getDepartmentAndAllChildren(get().departments),

    getDepartmentsByPath: async (path: string) => {
        const response = await fetch(`${path}`,{
            method: 'GET',
            headers: {'Content-type': 'aplication/json'},
        })

        if (!response.ok) {
            throw new Error('getDepartmentsByPath')
        }

        return await response.json()
    },

    getFeatureFlagsByDepartments: async (departments: IDepartment[]) => {
        const response = await fetch(`url`,{
            method: 'POST',
            headers: {'Content-type': 'aplication/json'},
            body: `${JSON.stringify(departments)}`
        })
        
        return await response.json()
    },

    // toDepartment: async (path: string) => {
    //     try {
    //         const newDepartments = await get().getDepartmentsByPath(path)
    //         const newFeatureFlags = await get().getFeatureFlagsByDepartments(newDepartments)
    //         set({
    //             featureFlags: newFeatureFlags, 
    //             departments: newDepartments,
    //         })
    //     }
    //     catch {
    //         throw new Error('toDepartmentError')
    //     }        
    // }
}))

export default useDepartmentsStore