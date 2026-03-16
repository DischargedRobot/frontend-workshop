import { IDepartment } from "@/entities/Departments/lib"
import { create } from "zustand"

interface IFilter {
    departmentIds: number[]
    name: string
}

interface IFFFiltersStore extends IFilter{
    setDepartment: (newDepartments: number[]) => void
    setName: (newName: string) => void
    setFilters: (filters: IFilter) => void
}

const useFFFiltersStore = create<IFFFiltersStore>((set, get) => ({

    departmentIds: [],
    name: '',

    setDepartment: (newDepartmentIds) => set({departmentIds: newDepartmentIds}),
    setName: (newName) => set({name: newName}),
    setFilters: (newFilters) => set(newFilters)

}))
export default useFFFiltersStore