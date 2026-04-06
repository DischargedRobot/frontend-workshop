import { create } from "zustand"

interface IApplicationStore {
	isLoading: boolean
	setIsLoading: (isLoading: boolean) => void
}

export const useApplicationStore = create<IApplicationStore>((set) => ({
	isLoading: true,
	setIsLoading: (isLoading) => set({ isLoading }),
}))
