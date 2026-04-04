import { IDepartment } from "@/entities/Departments/lib"
import { create } from "zustand"

interface IBreadcrumbStore {
	path: IDepartment[]
	setPath: (newPath: IDepartment[]) => void
	addDepartment: (department: IDepartment) => void
	getLastDepartment: () => IDepartment | undefined
}

// const getDepartment = () = {

// }

const useBreadcrumbStore = create<IBreadcrumbStore>((set, get) => ({
	path: [],
	setPath: (newPath) => set({ path: newPath }),

	addDepartment: (department) => set({ path: [...get().path, department] }),
	getLastDepartment: () => {
		const path = get().path
		return path[path.length - 1]
	},
}))

export default useBreadcrumbStore
