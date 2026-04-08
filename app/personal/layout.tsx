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
	const { profile, organization } = await functionInitApplication()

	return (
		<>
			<InitApplication profile={profile} organization={organization} />
			<AbilityProvider profile={profile}>
				<NavigationMenu />
				{children}
			</AbilityProvider>
		</>
	)
}

export default PersonalLayout
