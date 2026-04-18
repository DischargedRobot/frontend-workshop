"use client"

import { MenuItemType } from "antd/es/menu/interface"
import Link from "next/link"
import { useMemo } from "react"
import { useAbility } from "@casl/react"
import {
	LogoIcon,
	FFMenuIcon,
	ProfileIcon,
	StructureMenuIcon,
} from "@/shared/assets/Icon"
import { AbilityContext } from "@/shared/model/Ability"

export const useNavigationItems = (): MenuItemType[] => {
	// Can не поможет т.к. е
	// сть иконки и всё равно останется в дереве, даже если бы их не было
	const ability = useAbility(AbilityContext)

	return useMemo(() => {
		const items: MenuItemType[] = [
			{
				key: "logo",
				icon: <LogoIcon />,
				label: (
					<Link
						style={{ display: "flex", alignItems: "center" }}
						href="#!"
					>
						RedFlag
					</Link>
				),
			},
			{
				key: "/personal/profile",
				icon: <ProfileIcon />,
				label: <Link href="/personal/profile">Профиль</Link>,
			},
		]

		// Проверяем разрешения на просмотр отделов и исполнителей
		if (ability.can("read", "Department") || ability.can("read", "User")) {
			items.push({
				key: "/personal/structure",
				icon: <StructureMenuIcon />,
				label: <Link href="/personal/structure">Структура</Link>,
			})
		}

		// Проверяем разрешение на чтение FF для меню
		if (ability.can("read", "FF") && ability.can("read", "Department")) {
			items.push({
				key: "/personal/ffmenu",
				icon: <FFMenuIcon />,
				label: <Link href="/personal/ffmenu">Меню с FF</Link>,
			})
		}

		return items
	}, [ability])
}
