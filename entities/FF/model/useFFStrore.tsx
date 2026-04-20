import { create } from "zustand"
import { IFeatureFlag } from "../lib"

// const createData = (number: number): IFeatureFlag[] => {
// 	const organisationNodeId = useOrganizationStore.getState().organization.child.id

// 	return Array.from({ length: number }, (_, index) => ({
// 		key: index,
// 		id: index,
// 		name: `FF${index}`,
// 		departmentId: organisationNodeId,
// 		departmentName: `Depart${index}`,
// 		value: false,
// 		description: "d".repeat(index),
// 		lastUpdate: "11.11.2022",
// 		version: 1,
// 	}))

// }

interface IFFStore {
	featureFlags: IFeatureFlag[]
	setFeatureFlags: (newFeatureFlags: IFeatureFlag[]) => void
	addFeatureFlags: (newFeatureFlags: IFeatureFlag[]) => void
	updateFeatureFlag: (updatedFeatureFlag: IFeatureFlag) => void
	removeFeatureFlag: (deletedFeatureFlag: IFeatureFlag) => void
	removeFeatureFlags: (deletedFeatureFlags: IFeatureFlag[]) => void
	setToggling: (id: number, toggling: boolean) => void
}

const useFFStore = create<IFFStore>((set) => ({
	featureFlags: [],
	setFeatureFlags: (newFeatureFlags) =>
		set({ featureFlags: newFeatureFlags }),

	addFeatureFlags: (newFeatureFlags) =>
		set((state) => {
			const uniqueNewFlags = newFeatureFlags.filter(
				(newFlag) =>
					!state.featureFlags.some(
						(existingFlag) => existingFlag.id === newFlag.id,
					),
			)

			return { featureFlags: [...state.featureFlags, ...uniqueNewFlags] }
		}),

	updateFeatureFlag: (updatedFeatureFlag) =>
		set((state) => ({
			featureFlags: [...state.featureFlags.map((ff) =>
				ff.id === updatedFeatureFlag.id ? { ...ff, ...updatedFeatureFlag } : ff,
			)],
		})),

	setToggling: (id, toggling) =>
		set((state) => ({
			featureFlags: state.featureFlags.map((ff) =>
				ff.id === id ? { ...ff, isToggling: toggling } : ff,
			),
		})),

	removeFeatureFlag: (deletedFeatureFlag) =>
		set((state) => {
			return {
				featureFlags: [
					...state.featureFlags.filter(
						(ff) => ff.id != deletedFeatureFlag.id,
					),
				],
			}
		}),
	// TODO: может опитимизровать так, чтобы он не рассматривал пустые вхождения и возвращал {} ? (во всех сторах)
	removeFeatureFlags: (deletedFeatureFlags) =>
		set((state) => {
			return {
				featureFlags: [
					...state.featureFlags.filter((ff) =>
						deletedFeatureFlags.includes(ff),
					),
				],
			}
		}),
}))

export default useFFStore
