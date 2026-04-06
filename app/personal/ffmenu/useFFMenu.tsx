import { create } from "zustand"

interface IUseFFMenu {
	isHidden: boolean
	setIsHidden: (isHidden: boolean) => void
}

// const createData = (number: number): IFeatureFlag[] => {
// 	return Array.from({ length: number }, (_, index) => ({
// 		id: index,
// 		name: `FF${index}`,
// 		departmentId: index,
// 		departmentName: `Depart${index}`,
// 		isEnabled: false,
// 		description: "d".repeat(index),
// 		lastModified: "11.11.2022",
// 	}))
// }

export const useFFMenu = create<IUseFFMenu>((set) => ({
	isHidden: false,
	setIsHidden: (value) => set({ isHidden: !value }),
}))
