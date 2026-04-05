import { IDepartment } from "@/entities/Departments"
import { create } from "zustand"

export interface IOrganisation {
	id: number
	name: string
	// adminId: number
	child: IDepartment
}

interface IOrganisationStore {
	organisation: IOrganisation
	setOrganisation: (newOrganisation: IOrganisation) => void
	changeChild: (newChildren: IDepartment[]) => void
}

const useOrganisationStore = create<IOrganisationStore>((set) => ({
	organisation: {
		id: 2,
		name: "Рога и копыта",
		// adminId: 1,
		child: {
			id: 1,
			name: "s",
			children: [],
			featureFlags: [],
			link: "",
			isService: false,
			version: 1,
		},
	},
	setOrganisation: (newOrganisation) =>
		set({ organisation: newOrganisation }),
	changeChild: (newChildren) =>
		set((state) => ({
			organisation: {
				...state.organisation,
				child: {
					...state.organisation.child,
					children: newChildren,
				},
			},
		})),
}))

export default useOrganisationStore
