import { create } from "zustand"
import { IFilteringFunctionArguments } from "./useFilteredUsers"

interface IFilterStore {
	departmentIds: IFilteringFunctionArguments["departmentIds"]
	login: IFilteringFunctionArguments["login"]

	setLogin: (login: string) => void
	setDepartmentIds: (departmentIds: number[]) => void
	setFilters: (filters: Partial<IFilteringFunctionArguments>) => void
}

const useUserFiltersStore = create<IFilterStore>((set, get) => ({
	departmentIds: [],
	login: "",

	setLogin: (login) => set({ login }),
	setDepartmentIds: (departmentIds) => set({ departmentIds }),
	setFilters: (filters) => set(filters),
}))

export default useUserFiltersStore
