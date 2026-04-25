import { useApplicationStore } from "@/shared/model/Application"

const ThemeSettings = () => {
	const theme = useApplicationStore((state) => state.theme)
	return (
		<div>
			<h5> Тема: </h5>
		</div>
	)
}

export default ThemeSettings
