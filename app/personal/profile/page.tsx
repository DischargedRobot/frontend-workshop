"use client"

import "./Profile.scss"

import UserCard from "@/entities/User/UserCard/ui/UserCard"
import { useUsersStore } from "@/entities/User/UserList/model"
import UserSettings from "@/features/UserSettings/ui/UserSettings"
import UserTestingPanelForTheme from "@/features/UserTestingPanelForTheme/UserTestingPanelForTheme"
import { IRole, TROLE } from "@/shared/model/Role"
import { Content } from "antd/es/layout/layout"
import useProfileStore from "./model/useProfileStore"

const createIntialRoles = (): IRole[] => {
	const roles: IRole[] = []
	for (const [key, value] of Object.entries(TROLE)) {
		roles.push({ name: key, type: value, isEnabled: false })
	}
	return roles
}
const Profile = () => {
	// useEffect(
	//     () => redirect('/ffmenu', RedirectType.push)
	// , [])
	const setUser = useUsersStore((state) => state.setUser)

	const profile = useProfileStore((state) => state.profile)
	return (
		<Content className="profile-page">
			<div className="profile-page__settings">
				<UserCard user={profile} setUser={setUser} />
				<UserSettings />
			</div>

			<UserTestingPanelForTheme />
		</Content>
	)
}

export default Profile
