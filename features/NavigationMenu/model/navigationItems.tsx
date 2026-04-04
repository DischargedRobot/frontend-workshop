import { MenuItemType } from "antd/es/menu/interface"
import Link from "next/link"
import {
	LogoIcon,
	FFMenuIcon,
	ProfileIcon,
	StructureMenuIcon,
} from "@/shared/assets/Icon"

export const navigationItems: MenuItemType[] = [
	{
		key: "logo",
		icon: <LogoIcon />,
		label: (
			<Link style={{ display: "flex", alignItems: "center" }} href="#!">
				RedFlag
			</Link>
		),
	},
	{
		key: "profile",
		icon: <ProfileIcon />,
		label: <Link href="profile">Профиль</Link>,
	},
	{
		key: "structure",
		icon: <StructureMenuIcon />,
		label: <Link href="structure">Структура организации</Link>,
	},
	{
		key: "ffmenu",
		icon: <FFMenuIcon />,
		label: <Link href="ffmenu">Меню с FF</Link>,
	},
]
