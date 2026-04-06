"use client"

import "./Profile.scss"

import { ProfileContainer } from "@/widgets/ProfileContainer"
import { ProfileSettingsContainer } from "@/widgets/ProfileSettingsContainer"
import { Content } from "antd/es/layout/layout"

const Profile = () => {
	return (
		<Content className="profile-page">
			<ProfileContainer />
			<ProfileSettingsContainer />
		</Content>
	)
}

export default Profile
