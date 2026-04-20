import { create } from "zustand"
import { IProfile } from "../lib/profileTypes"

interface IProfileStore {
	profile: IProfile
	setLogin: (login: string) => void
	setDepartmentId: (departmentId: number) => void
	setProfile: (profile: IProfile) => void
}

export const useProfileStore = create<IProfileStore>((set) => ({
	profile: {
		departmentName: "",
		id: 0,
		login: "",
		password: "",
		roles: [],
	},

	setLogin: (login) =>
		set((state) => ({ profile: { ...state.profile, login } })),
	setDepartmentId: (departmentId) =>
		set((state) => ({ profile: { ...state.profile, departmentId } })),
	setProfile: (profile) => set({ profile }),
}))
