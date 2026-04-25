import { create } from "zustand"

interface IApplicationStore {
	isLoading: boolean
	setIsLoading: (isLoading: boolean) => void
	theme: {
		main: string
		secondary: string
		text: string
		textActive: string
		background: string
	}
	setTheme: (theme: IApplicationStore["theme"]) => void
}

export const useApplicationStore = create<IApplicationStore>((set) => ({
	isLoading: true,
	setIsLoading: (isLoading) => set({ isLoading }),

	theme: {
		main: "#cc38c7",
		secondary: "#e58df6",
		text: "#f9f9f9",
		textActive: "#fcfcfc",
		background: "#e3b9e5",
	},
	setTheme: (theme) => set({ theme }),
}))
