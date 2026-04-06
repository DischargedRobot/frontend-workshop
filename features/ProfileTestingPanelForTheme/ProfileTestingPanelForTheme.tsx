import "./ProfileTestingPanelForTheme.scss"

const ProfileTestingPanelForTheme = () => {
	return (
		<div className="user-testing-panel">
			<span className="user-testing-panel__text"> Бла-бла текст </span>
			<span className="user-testing-panel__active-element">
				{" "}
				Активный элемент{" "}
			</span>
			<span> Другие элементы </span>
		</div>
	)
}

export default ProfileTestingPanelForTheme
