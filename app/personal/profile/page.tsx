"use client"

import "./Profile.scss"

import { ProfileContainer } from "@/widgets/ProfileContainer"
import { Content } from "antd/es/layout/layout"

const Profile = () => {
	return (
		<Content className="profile-page">
			<ProfileContainer />
		</Content>
	)
}

export default Profile
