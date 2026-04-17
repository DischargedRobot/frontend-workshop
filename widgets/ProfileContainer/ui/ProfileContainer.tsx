"use client"

import "./ProfileContatiner.scss"

import { Profile } from "@/entities/Profile"
import { useProfileStore } from "@/entities/Profile"
import { LogOut } from "@/features/Profile/LogOut"
import { ProfileSettings } from "@/features/ProfileSettings"
import ProfileTestingPanelForTheme from "@/features/ProfileTestingPanelForTheme"

export const ProfileContainer = () => {
	const profile = useProfileStore((state) => state.profile)
	return (
		<>
			<div className="profile">
				<Profile profile={profile} logOutButton={<LogOut />} />
				<div className="profile__settings">
					<ProfileSettings />
					<ProfileTestingPanelForTheme />

				</div>
			</div>
		</>
	)
}
