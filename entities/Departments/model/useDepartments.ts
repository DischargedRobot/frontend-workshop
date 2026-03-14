import { create } from "zustand";
import { IDepartment } from "../lib";

interface IUseDepartments {
    departments: IDepartment[]
    setDepartments: (newDepartments: IDepartment[]) => void
}

const useDepartments = create<IUseDepartments>((set, get) => ({
    
    departments: [],
    setDepartments: (newDepartments) => set({departments: newDepartments}),

}))

export default useDepartments