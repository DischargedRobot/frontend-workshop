import NavigationMenu from "@/features/NavigationMenu/ui/NavigationMenu"
import { Metadata } from "next"
import React, { Suspense } from "react"
import { InitApplication } from "./InitApplication"
import { functionInitApplication } from "./functionInitApplication"
import { AbilityProvider } from "@/shared/model/Ability"
// import { Spin } from "antd"

export const metadata: Metadata = {
	title: "Ваши фича флаги",
}

interface Props {
	children: React.ReactNode
}

// const LoadingFallback = () => (
// 	<Spin
// 		size="large"
// 		style={{
// 			display: "flex",
// 			justifyContent: "center",
// 			alignItems: "center",
// 			height: "100vh",
// 		}}
// 	/>
// )

const PersonalLayoutContent = async ({ children }: Props) => {
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

// const PersonalLayout = ({ children }: Props) => {
// 	return (
// 		<Suspense fallback={<LoadingFallback />}>
// 			<PersonalLayoutContent>{children}</PersonalLayoutContent>
// 		</Suspense>
// 	)
// }

export default PersonalLayoutContent
