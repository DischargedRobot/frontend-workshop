import { IDepartment } from "@/entities/Departments"
import { create } from "zustand"

export interface IOrganization {
	id: number
	name: string
	// adminId: number
	child: IDepartment
}

interface IOrganizationStore {
	organization: IOrganization
	setOrganization: (newOrganization: IOrganization) => void
	changeChild: (newChildren: IDepartment[]) => void
}

export const useOrganizationStore = create<IOrganizationStore>((set) => ({
	organization: {} as IOrganization, // только в начале так, потом сразу подгружается
	setOrganization: (organization) => set({ organization }),
	changeChild: (newChildren) =>
		set((state) => ({
			organization: {
				...state.organization,
				child: {
					...state.organization.child,
					children: newChildren,
				},
			},
		})),
}))
