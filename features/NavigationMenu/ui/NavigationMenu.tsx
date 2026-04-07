"use client"

import "./NavigationMenu.scss"

import { Menu } from "antd"
import Sider from "antd/es/layout/Sider"
import { useState } from "react"
import { RightOutlined } from "@ant-design/icons"
import { useNavigationItems } from "../model"
const NavigationMenu = () => {
	const [collapsed, setCollapsed] = useState(false)

	const navItems = useNavigationItems()

	return (
		<Sider
			collapsedWidth={80}
			style={{
				zIndex: 10,
				height: "100vh",
				top: 0,
				position: "sticky",
				boxShadow: "3px 0 10px var(--shadow)",
				borderRight: "1px solid var(--border-for-nav-panel)",
			}}
			collapsed={collapsed}
		>
			<nav
				className={`navigation-menu ${collapsed ? "navigation-menu_collapsed" : ""}`}
			>
				<button
					className="navigation-menu__collapsing-button"
					onClick={() => setCollapsed((prev) => !prev)}
				>
					<RightOutlined
						className="collapsed-icon"
						style={collapsed ? { rotate: "180deg" } : {}}
					/>
				</button>
				<Menu
					items={navItems}
					className=""
					mode="inline"
					inlineCollapsed={collapsed}
				></Menu>
			</nav>
		</Sider>
	)
}

export default NavigationMenu
