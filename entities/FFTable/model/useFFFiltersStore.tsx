import { IDepartment } from "@/entities/Departments/lib"
import { create } from "zustand"

interface IFilter {
    departmentIds: number[]
    name: string
}

interface IFFFiltersStore extends IFilter{
    setDepartment: (newDepartmentIds: number[]) => void
    addDepartment: (newDepartmentId: number) => void
    addDepartmentAndItChildren: (newDepartment: IDepartment) => void

    setName: (newName: string) => void
    setFilters: (filters: IFilter) => void
}

const useFFFiltersStore = create<IFFFiltersStore>((set, get) => ({

    departmentIds: [],
    name: '',

    setDepartment: (newDepartmentIds) => set({departmentIds: newDepartmentIds}),
    addDepartment: (newDepartmentId) => set({departmentIds: [...get().departmentIds, newDepartmentId]}),
    addDepartmentAndItChildren: (newDepartment) => set({departmentIds: [...get().departmentIds, newDepartment.id, ...newDepartment.children.map(dep => dep.id)]}),
    setName: (newName) => set({name: newName}),
    setFilters: (newFilters) => set(newFilters)

}))
export default useFFFiltersStore