import { IUser } from "@/entities/UserCard/ui/types"
import loginApi from "@/shared/api/loginApi"
import { IRole, TROLE } from "@/shared/model/Role"
import { profile } from "console"
import { set } from "react-hook-form"
import { create } from "zustand"

export interface IProfile extends IUser {}

interface IProfileStore {
	profile: IProfile
	setProfile: (newProfileData: IProfile) => void
}
const createIntialRoles = (): IRole[] => {
	const roles: IRole[] = []
	for (const [key, value] of Object.entries(TROLE)) {
		roles.push({ name: key, type: value, isEnabled: true })
	}
	return roles
}

const useProfileStore = create<IProfileStore>((set, get) => ({
	profile: {
		login: "Robo",
		password: "password",
		id: 1,
		roles: createIntialRoles(),
		departmentId: 1,
	},
	setProfile: (newProfileData) => set({ profile: newProfileData }),
}))

export default useProfileStore
