import "./ProfileSettings.scss"

import LanguageSettings from "./LanuageSettings/LanguageSettings"
import TextSizeSettings from "./TextSizeSettings/TextSizeSettings"
import ThemeSettings from "./ThemeSettings/ThemeSettings"
import { ColorBlocksPicker } from "@/features/ChangeThemeColor"

const ProfileSettings = () => {
	return (
		<div className="profile-settings">
			<LanguageSettings />
			<ThemeSettings />
			<ColorBlocksPicker />
			{/* <TextSizeSettings /> */}
			<button> Сохранить </button>
		</div>
	)
}

export default ProfileSettings
