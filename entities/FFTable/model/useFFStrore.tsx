import { create } from "zustand";
import { IFeatureFlag } from "../ui/FFTable";



const createData = (number: number) : IFeatureFlag[] => {
    return Array.from(({length: number}), (_, index) => ({
        key: index,
        id: index,
        name: `FF${index}`,
        departmentId: index,
        departmentName: `Depart${index}`,
        value: false ,
        description: 'd'.repeat(index),
        lastModified: '11.11.2022'
    }))
}

interface IFFStore {
    featureFlags: IFeatureFlag[]
    setFeatureFlags: (newFeatureFlags: IFeatureFlag[]) => void
    addFeatureFlags: (newFeatureFlags: IFeatureFlag[]) => void
}


const useFFStore = create<IFFStore>((set) => ({

    featureFlags: createData(10),
    setFeatureFlags: (newFeatureFlags) => set({featureFlags: newFeatureFlags}),
    
    addFeatureFlags: (newFeatureFlags) => set(state => {
        const uniqueNewFlags = newFeatureFlags.filter(newFlag => 
            !state.featureFlags.some(existingFlag => existingFlag.id === newFlag.id)
        )

        return {featureFlags: [...state.featureFlags, ...uniqueNewFlags]}
    })
}))

export default useFFStore