import NavigationMenu from "@/features/NavigationMenu/ui/NavigationMenu"
import { Metadata } from "next"
import React from "react"
import { InitApplication } from "./InitApplication"
import { functionInitApplication } from "./functionInitApplication"
import { AbilityProvider } from "@/shared/model/Ability"

export const metadata: Metadata = {
	title: "Ваши фича флаги",
}

interface Props {
	children: React.ReactNode
}

const PersonalLayout = async ({ children }: Props) => {
	const { profile, organisation } = await functionInitApplication()

	return (
		<>
			<InitApplication profile={profile} organisation={organisation} />
			<AbilityProvider profile={profile}>
				<NavigationMenu />
				{children}
			</AbilityProvider>
		</>
	)
}

export default PersonalLayout
