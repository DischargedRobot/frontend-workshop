"use client"

import { MenuItemType } from "antd/es/menu/interface"
import Link from "next/link"
import { useMemo } from "react"
import {
	LogoIcon,
	FFMenuIcon,
	ProfileIcon,
	StructureMenuIcon,
} from "@/shared/assets/Icon"
import { TROLE } from "@/shared/model/Role/types"
import { useProfileStore } from "@/entities/Profile"

export const useNavigationItems = (): MenuItemType[] => {
	const profile = useProfileStore((state) => state.profile)

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
				key: "profile",
				icon: <ProfileIcon />,
				label: <Link href="profile">Профиль</Link>,
			},
		]

		// Проверяем разрешения на просмотр отделов и исполнителей
		const hasDepartmentReadPermission = profile?.roles?.some(
			(role) => role.type === TROLE.DR,
		)
		const hasEmployeeReadPermission = profile?.roles?.some(
			(role) => role.type === TROLE.ER,
		)

		if (hasDepartmentReadPermission || hasEmployeeReadPermission) {
			items.push({
				key: "structure",
				icon: <StructureMenuIcon />,
				label: <Link href="structure">Структура организации</Link>,
			})
		}

		// Проверяем наличие роли для просмотра фич флагов
		const hasFFReadPermission = profile?.roles?.some(
			(role) => role.type === TROLE.FFR,
		)

		if (hasFFReadPermission) {
			items.push({
				key: "ffmenu",
				icon: <FFMenuIcon />,
				label: <Link href="ffmenu">Меню с FF</Link>,
			})
		}

		return items
	}, [profile?.roles])
}
