import "./UserSettings.scss"

import LanguageSettings from "./LanuageSettings/LanguageSettings"
import TextSizeSettings from "./TextSizeSettings/TextSizeSettings"
import ThemeSettings from "./ThemeSettings/ThemeSettings"

const UserSettings = () => {
	return (
		<div className="user-settings">
			<LanguageSettings />
			<ThemeSettings />
			<TextSizeSettings />
			<button> Сохранить </button>
		</div>
	)
}

export default UserSettings
