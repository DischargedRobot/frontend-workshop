import { create } from "zustand";

interface IUseFullDepartmentTable {
    isHidden: boolean
    setIsHidden: (isHidden: boolean) => void
}

export const useFullDepartmentTable = create<IUseFullDepartmentTable>( set => ({
    isHidden: false,
    setIsHidden: (value) => set({isHidden: !value})
}))