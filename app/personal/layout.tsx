import NavigationMenu from "@/features/NavigationMenu/ui/NavigationMenu"
import { Metadata } from "next"
import React, { Suspense } from "react"
import { InitApplication } from "./InitApplication"
import { functionInitApplication } from "./functionInitApplication"

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
			<NavigationMenu />
			<Suspense fallback={<div>Загружаем медленные данные...</div>}>
				<InitApplication
					profile={profile}
					organisation={organisation}
				/>
				{children}
			</Suspense>
		</>
	)
}

export default PersonalLayout
