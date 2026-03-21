import departmentApi from "@/entities/Departments/api/departmentApi"
import { IDepartment } from "@/entities/Departments/lib"
import useDepartmentsStore from "@/entities/Departments/model/useDepartmentsStore"
import { create } from "zustand"

interface IBreadcrumbStore {
    path: IDepartment[]
    setPath: (newPath: IDepartment[]) => void
    addDepartment: (department: IDepartment) => void
}

// const getDepartment = () = {

// }

const useBreadcrumbStore = create<IBreadcrumbStore>((set, get) => ({

    path: [],
    setPath: (newPath) => set({path: newPath}),
    
    addDepartment: (department) => set({path: [...get().path, department]})

}))

export default useBreadcrumbStore