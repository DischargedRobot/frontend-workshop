"use client"

import { Profile } from "@/entities/Profile"
import { useProfileStore } from "@/entities/Profile"

export const ProfileContainer = () => {
	const profile = useProfileStore((state) => state.profile)
	console.log(profile, "ProfileContainer")
	return (
		<>
			<div className="profile-page__settings">
				<Profile profile={profile} />
			</div>
		</>
	)
}
