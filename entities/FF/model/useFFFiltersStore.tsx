import { IDepartment } from "@/entities/Departments/lib"
import { create } from "zustand"

interface IFilter {
	departmentIds: number[]
	name: string
}

interface IFFFiltersStore extends IFilter {
	setDepartment: (newDepartmentIds: number[]) => void
	addDepartmentId: (newDepartmentId: number) => void
	addDepartmentAndItChildren: (newDepartment: IDepartment) => void

	setName: (newName: string) => void
	setFilters: (filters: IFilter) => void
}

const useFFFiltersStore = create<IFFFiltersStore>((set, get) => ({
	departmentIds: [],
	name: "",

	setDepartment: (newDepartmentIds) =>
		set({ departmentIds: newDepartmentIds }),
	addDepartmentId: (newDepartmentId) =>
		set((state) => ({
			departmentIds: [
				...new Set([...state.departmentIds, newDepartmentId]),
			],
		})),

	addDepartmentAndItChildren: (newDepartment) =>
		set((state) => {
			const newDepIdAndItsChildrenIds = newDepartment.children
				.map((dep) => dep.id)
				.concat(newDepartment.id)

			const filteredDepartment = newDepIdAndItsChildrenIds.filter(
				(newDepId) => {
					return !state.departmentIds.includes(newDepId)
				},
			)

			return {
				departmentIds: [
					...new Set([...state.departmentIds, ...filteredDepartment]),
				],
			}
		}),

	setName: (newName) => set({ name: newName }),
	setFilters: (newFilters) => set(newFilters),
}))
export default useFFFiltersStore
