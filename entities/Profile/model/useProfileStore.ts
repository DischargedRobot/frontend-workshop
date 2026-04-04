import { create } from "zustand"
import { IProfile } from "../lib"

interface IProfileStore {
	profile: IProfile
	setLogin: (login: string) => void
	setPassword: (password: string) => void
	setProfile: (profile: IProfile) => void
}

export const useProfileStore = create<IProfileStore>((set) => ({
	profile: {
		login: "",
		password: "",
	},

	setLogin: (login) =>
		set((state) => ({ profile: { ...state.profile, login } })),
	setPassword: (password) =>
		set((state) => ({ profile: { ...state.profile, password } })),
	setProfile: (profile) => set({ profile }),
}))
