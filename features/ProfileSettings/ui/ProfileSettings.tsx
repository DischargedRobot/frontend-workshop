import "./ProfileSettings.scss"

import LanguageSettings from "./LanuageSettings/LanguageSettings"
import TextSizeSettings from "./TextSizeSettings/TextSizeSettings"
import ThemeSettings from "./ThemeSettings/ThemeSettings"

const ProfileSettings = () => {
	return (
		<div className="profile-settings">
			<LanguageSettings />
			<ThemeSettings />
			{/* <TextSizeSettings /> */}
			<button> Сохранить </button>
		</div>
	)
}

export default ProfileSettings
