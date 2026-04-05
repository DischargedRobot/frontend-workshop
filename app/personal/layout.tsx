import NavigationMenu from "@/features/NavigationMenu/ui/NavigationMenu"
import { Metadata } from "next"
import React from "react"

export const metadata: Metadata = {
	title: "Ваши фича флаги",
}

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
