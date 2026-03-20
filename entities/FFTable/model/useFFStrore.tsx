import { create } from "zustand";
import { IFeatureFlag } from "../ui/FFTable";

interface IFFStore {
    featureFlags: IFeatureFlag[]
    setFeatureFlags: (newFeatureFlags: IFeatureFlag[]) => void
}


const createData = (number: number) : IFeatureFlag[] => {
    return Array.from(({length: number}), (_, index) => ({
        key: index,
        id: index,
        name: `FF${index}`,
        nodeId: index,
        departmentName: `Depart${index}`,
        value: false ,
        description: 'd'.repeat(index),
        lastModified: '11.11.2022'
    }))
}

const useFFStore = create<IFFStore>((set) => ({

    featureFlags: createData(10),
    setFeatureFlags: (newFeatureFlags) => set({featureFlags: newFeatureFlags}),
    
}))

export default useFFStore