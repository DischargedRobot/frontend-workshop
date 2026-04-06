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

export const useOrganisationStore = create<IOrganisationStore>((set) => ({
	organisation: {} as IOrganisation, // только в начале так, потом сразу подгружается
	setOrganisation: (organisation) => set({ organisation }),
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
