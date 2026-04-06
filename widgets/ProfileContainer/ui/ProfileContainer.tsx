"use client"

import { UserCard } from "@/entities/User"
import { useUsersStore } from "@/entities/User"
import { useProfileStore } from "@/entities/Profile"

export const ProfileContainer = () => {
	const setUser = useUsersStore((state) => state.setUser)
	const profile = useProfileStore((state) => state.profile)

	return (
		<>
			<div className="profile-page__settings">
				<UserCard user={profile} setUser={setUser} />
			</div>
		</>
	)
}
