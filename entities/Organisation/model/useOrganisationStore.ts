import { IDepartment } from "@/entities/Departments"
import { create } from "zustand"

export interface IOrganisation {
    id: number
    name: string
    adminId: number
    children: IDepartment
}

interface IOrganisationStore {
    organisation: IOrganisation
    setOrganisation: (newOrganisation: IOrganisation) => void
}

const useOrganisationStore = create<IOrganisationStore>((set) => ({

    organisation: {id: 10, name: 'Рога и копыта', adminId: 1, children: {id: 23, name: 's', children: [], featureFlags:[], link:'', isService: false, version: 1}},
    setOrganisation: (newOrganisation) => set({organisation: newOrganisation})

}))

export default useOrganisationStore