import { create } from "zustand"
import { IProfile } from "../lib/profileTypes"

interface IProfileStore {
	profile: IProfile
	setLogin: (login: string) => void
	setPassword: (password: string) => void
	setDepartmentId: (departmentId: number) => void
	setProfile: (profile: IProfile) => void
}

export const useProfileStore = create<IProfileStore>((set) => ({
	profile: {
		id: 0,
		login: "",
		password: "",
		roles: [],
	},

	setLogin: (login) =>
		set((state) => ({ profile: { ...state.profile, login } })),
	setPassword: (password) =>
		set((state) => ({ profile: { ...state.profile, password } })),
	setDepartmentId: (departmentId) =>
		set((state) => ({ profile: { ...state.profile, departmentId } })),
	setProfile: (profile) => set({ profile }),
}))
