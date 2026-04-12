import {
	useMemo,
	useState,
} from "react"

export const useChangeVisibleServicePanel =
	() => {
		const [
			isVisible,
			setIsVisible,
		] = useState(false)

		return useMemo(
			() => ({
				isVisible,
				setIsVisible,
			}),
			[isVisible, setIsVisible],
		)
	}
