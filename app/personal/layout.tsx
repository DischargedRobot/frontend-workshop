import NavigationMenu from "@/features/NavigationMenu/ui/NavigationMenu"
import React from "react"

interface Props {
	children: React.ReactNode
}

const PersonalLayout = ({ children }: Props) => {
	return (
		<>
			<NavigationMenu />
			{children}
		</>
	)
}

export default PersonalLayout
