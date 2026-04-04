import { Department } from "@/entities/Departments/lib/DepartmentType"
import { IFeatureFlag } from "@/entities/FF"
import { create } from "zustand"

interface IUseFFMenu {
	isHidden: boolean
	setIsHidden: (isHidden: boolean) => void
}
const data: Department[] = [
	{
		id: 1,
		name: "Depart1",
		link: "12312",
	},
	{
		id: 2,
		name: "Depart2",
		link: "#!",
	},
	{
		id: 3,
		name: "Depart3",
		link: "#!",
	},
	{
		id: 4,
		name: "Depart1",
		link: "12312",
	},
	{
		id: 5,
		name: "Depart2",
		link: "#!",
	},
	{
		id: 6,
		name: "Depart3",
		link: "#!",
	},
	{
		id: 7,
		name: "Depart1",
		link: "12312",
	},
	{
		id: 8,
		name: "Depart2",
		link: "#!",
	},
	{
		id: 9,
		name: "Depart3",
		link: "#!",
	},
	{
		id: 10,
		name: "Depart1",
		link: "12312",
	},
]

const createData = (number: number): IFeatureFlag[] => {
	return Array.from({ length: number }, (_, index) => ({
		id: index,
		name: `FF${index}`,
		departmentId: index,
		departmentName: `Depart${index}`,
		isEnabled: false,
		description: "d".repeat(index),
		lastModified: "11.11.2022",
	}))
}

export const useFFMenu = create<IUseFFMenu>((set, get) => ({
	isHidden: false,
	setIsHidden: (value) => set({ isHidden: !value }),
}))
