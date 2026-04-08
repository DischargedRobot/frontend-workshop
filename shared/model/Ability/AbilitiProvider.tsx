"use client"
import { createContext } from "react"
import { AbilityBuilder, createMongoAbility, MongoAbility } from "@casl/ability"
import { IProfile } from "@/shared/lib/types"
import { ROLE_ABILITY_MAP } from "@/shared/model/Role/types"
import { createContextualCan, useAbility } from "@casl/react"
import { useProfileStore } from "@/entities/Profile"

export type Actions = "create" | "read" | "update" | "delete" | "manage"
export type Subjects = "FF" | "Department" | "User" | "all"

export type ProfileAbility = MongoAbility<[Actions, Subjects]>

// Дефолтный ability запрещающий всё
const createDefaultAbility = (): ProfileAbility => {
	const { cannot, build } = new AbilityBuilder<ProfileAbility>(
		createMongoAbility,
	)

	cannot("manage", "all")

	return build()
}

export const AbilityContext = createContext<ProfileAbility>(
	createDefaultAbility(),
)

export const defineAbility = (profile: IProfile): ProfileAbility => {
	const { can, build } = new AbilityBuilder<ProfileAbility>(
		createMongoAbility,
	)

	// Проверяем каждую роль профиля
	profile.roles.forEach((role) => {
		if (!role.isEnabled) return

		const ability = ROLE_ABILITY_MAP[role.type]
		if (ability) {
			can(ability.action, ability.subject)
		}
	})

	return build()
}

interface Props {
	children?: React.ReactNode
	profile: IProfile
}

export const AbilityProvider = (props: Props) => {
	const { children } = props
	const profile = useProfileStore((state) => state.profile)
	console.log("AbilityProvider initialization", profile, "profile")
	return (
		<AbilityContext.Provider value={defineAbility(profile)}>
			{children}
		</AbilityContext.Provider>
	)
}

export const Can = createContextualCan<ProfileAbility>(AbilityContext.Consumer)
