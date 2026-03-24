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
    removeFeatureFlag: (deletedFeatureFlag: IFeatureFlag) => void
    removeFeatureFlags: (deletedFeatureFlags: IFeatureFlag[]) => void
}


const useFFStore = create<IFFStore>((set) => ({

    featureFlags: [],
    setFeatureFlags: (newFeatureFlags) => set({featureFlags: newFeatureFlags}),
    
    addFeatureFlags: (newFeatureFlags) => set(state => {
        const uniqueNewFlags = newFeatureFlags.filter(newFlag => 
            !state.featureFlags.some(existingFlag => existingFlag.id === newFlag.id)
        )

        return {featureFlags: [...state.featureFlags, ...uniqueNewFlags]}
    }),

    removeFeatureFlag: (deletedFeatureFlag) => set(state => {
        return {featureFlags: [...state.featureFlags.filter(ff => ff.id != deletedFeatureFlag.id)]}
    }),
    // TODO: может опитимизровать так, чтобы он не рассматривал пустые вхождения и возвращал {} ? (во всех сторах)
    removeFeatureFlags: (deletedFeatureFlags) => set(state => {
        return {featureFlags: [...state.featureFlags.filter(ff => deletedFeatureFlags.includes(ff))]}
    }),
}))

export default useFFStore