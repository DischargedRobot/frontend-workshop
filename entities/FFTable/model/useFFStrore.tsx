import { create } from "zustand";
import { FeatureFlag, FeatureFlag } from "../ui/FFTable";

interface IFFStore {
    featureFlags: FeatureFlag[]
    setFeatureFlags: (newFeatureFlags: FeatureFlag[]) => void
}


const createData = (number: number) : FeatureFlag[] => {
    return Array.from(({length: number}), (_, index) => ({
        key: index,
        id: index,
        name: `FF${index}`,
        departmentId: index,
        departmentName: `Depart${index}`,
        isEnabled: false ,
        description: 'd'.repeat(index),
        lastModified: '11.11.2022'
    }))
}

const useFFStore = create<IFFStore>((set, get) => ({

    featureFlags: createData(10),
    setFeatureFlags: (newFeatureFlags) => set({featureFlags: newFeatureFlags}),
    
}))

export default useFFStore