"use client"

import "./NavigationMenu.scss"

import { Grid, Menu } from "antd"
import Sider from "antd/es/layout/Sider"
import { useState } from "react"
import { RightOutlined } from "@ant-design/icons"
import { useNavigationItems } from "../model"

const { useBreakpoint } = Grid

const NavigationMenu = () => {
	const [collapsed, setCollapsed] = useState(false)
	const screens = useBreakpoint()
	const isMobile = !screens.md

	const navItems = useNavigationItems()


	return (
		<Sider
			collapsedWidth={80}
			className={`navigation-menu-sider`}
			collapsed={!isMobile && collapsed}
		>
			<nav
				className={`navigation-menu`}
			>
				{!isMobile && (
					<button
						className="navigation-menu__collapsing-button"
						onClick={() => setCollapsed((prev) => !prev)}
					>
						<RightOutlined
							className="collapsed-icon"
							style={collapsed ? { rotate: "180deg" } : {}}
						/>
					</button>
				)}
				<Menu
					items={navItems}
					mode={isMobile ? "horizontal" : "inline"}
					tooltip={isMobile ? false : { placement: "right" }}
					{...(isMobile && { disabledOverflow: true })} // чтобы при горизонтальном режиме не бегали кнопки
					{...(!isMobile && { inlineCollapsed: collapsed })}
				/>
			</nav>
		</Sider>
	)
}

export default NavigationMenu
