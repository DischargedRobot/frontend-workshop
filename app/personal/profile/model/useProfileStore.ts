import { IProfile } from "@/entities/Profile/lib"
import { IRole, TROLE } from "@/shared/model/Role"
import { randomInt } from "crypto"
import { create } from "zustand"

interface IProfileStore {
	profile: IProfile
	setProfile: (newProfileData: IProfile) => void
}
const createIntialRoles = (): IRole[] => {
	const roles: IRole[] = []
	for (const [key, value] of Object.entries(TROLE)) {
		roles.push({ id: randomInt(1000), type: value, isEnabled: true })
	}
	return roles
}

const useProfileStore = create<IProfileStore>((set) => ({
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
