"use client"

import { ProfileSettings } from "@/features/ProfileSettings"
import ProfileTestingPanelForTheme from "@/features/ProfileTestingPanelForTheme"

export const ProfileSettingsContainer = () => {
	return (
		<>
			<ProfileSettings />
			<ProfileTestingPanelForTheme />
		</>
	)
}
