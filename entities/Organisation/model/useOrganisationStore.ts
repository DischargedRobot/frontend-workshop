import { create } from "zustand"

interface IOrganisation {
    id: number
    name: string
    adminId: number
}

interface IOrganisationStore {
    organisation: IOrganisation
    setOrganisation: (newOrganisation: IOrganisation) => void
}

const useOrganisationStore = create<IOrganisationStore>((set) => ({

    organisation: {id: 10, name: 'Рога и копыта', adminId: 1},
    setOrganisation: (newOrganisation) => set({organisation: newOrganisation})

}))

export default useOrganisationStore