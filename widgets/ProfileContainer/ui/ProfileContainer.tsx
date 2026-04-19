"use client"

import "./ProfileContatiner.scss"

import { Profile } from "@/entities/Profile"
import { useProfileStore } from "@/entities/Profile"
import { LogOut } from "@/features/Profile/LogOut"



export const ProfileContainer = () => {
	const profile = useProfileStore((state) => state.profile)
	return (
		<>
			<Profile profile={profile} logOutButton={<LogOut />} />
		</>
	)
}
