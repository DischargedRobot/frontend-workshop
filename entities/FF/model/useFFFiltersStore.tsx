import { IDepartment } from "@/entities/Departments/lib"
import { create } from "zustand"

interface IFilter {
	departments: IDepartment[]
	name: string
}

interface IFFFiltersStore extends IFilter {
	setDepartments: (newDepartment: IDepartment[]) => void
	addDepartmentId: (newDepartment: IDepartment) => void
	addDepartmentAndItChildren: (newDepartment: IDepartment) => void

	setName: (newName: string) => void
	setFilters: (filters: IFilter) => void
}

const useFFFiltersStore = create<IFFFiltersStore>((set, get) => ({
	departments: [],
	name: "",

	setDepartments: (departments) => set({ departments }),

	addDepartmentId: (newDepartment) =>
		set((state) => ({
			departments: [
				...new Set([...state.departments, newDepartment]),
			],
		})),

	addDepartmentAndItChildren: (newDepartment) =>
		set((state) => {
			const newDepAndItsChildren = newDepartment.children
				.concat(newDepartment)

			const filteredDepartment = newDepAndItsChildren.filter(
				(newDep) => {
					return !state.departments.some((dep) => dep.id === newDep.id)
				},
			)

			return {
				departments: [
					...new Set([...state.departments, ...filteredDepartment]),
				],
			}
		}),

	setName: (newName) => set({ name: newName }),
	setFilters: (newFilters) => set(newFilters),
}))
export default useFFFiltersStore
