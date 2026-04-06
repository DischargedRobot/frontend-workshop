import { useUserFiltersStore } from "@/entities/User"
import { createDepartmentStore } from "./createDepartmentStoreFactory"
import { IDepartment } from "../lib"

interface SelectedDepartmentStoreExtensions {
	removeDepartments: () => void
	addDepartments: (departments: IDepartment[]) => void
}

export const useSelectedDepartmentsStore =
	createDepartmentStore<SelectedDepartmentStoreExtensions>((set) => ({
		removeDepartments: () => {
			set({ departments: [] }) // перезаписываем имеющийся
			useUserFiltersStore.getState().setDepartmentIds([])
		},

		addDepartments: (departments) => {
			set((state) => ({
				departments: [
					...(state.departments as IDepartment[]),
					...departments,
				],
			}))
		},
	}))
