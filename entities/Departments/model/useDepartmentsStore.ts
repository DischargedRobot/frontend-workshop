import { create } from "zustand";
import { IDepartment } from "../lib";

const InitialDepartments: IDepartment[] = Array.from({length: 5}).map(
  (_, index) => {
    return {id: index, name: index.toString(), children: [], featureFlags: [], link: ''}
  }
)


interface IUseDepartments {
    departments: IDepartment[]
    setDepartments: (newDepartments: IDepartment[]) => void
}

const useDepartmentsStore = create<IUseDepartments>((set, get) => ({
    
    departments: [...InitialDepartments],
    setDepartments: (newDepartments) => set({departments: newDepartments}),

}))

export default useDepartmentsStore