import "./ProfileTestingPanelForTheme.scss"

const ProfileTestingPanelForTheme = () => {
	return (
		<div className="profile-testing-panel">
			<span className="profile-testing-panel__text"> Бла-бла текст </span>
			<span className="profile-testing-panel__active-element">
				{" "}
				Активный элемент{" "}
			</span>
			<span> Другие элементы </span>
		</div>
	)
}

export default ProfileTestingPanelForTheme
