import NavigationMenu from "@/features/NavigationMenu/ui/NavigationMenu"
import { Metadata } from "next"
import React from "react"
import { InitProfile } from "./InitProfile"

export const metadata: Metadata = {
	title: "Ваши фича флаги",
}

interface Props {
	children: React.ReactNode
}


const PersonalLayout = async ({ children }: Props) => {
	return (
		<>
			<InitProfile />
			<NavigationMenu />
			{children}
		</>
	)
}

export default PersonalLayout
