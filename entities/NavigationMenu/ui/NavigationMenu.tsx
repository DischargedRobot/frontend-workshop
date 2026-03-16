'use client'
import { Menu } from "antd"
import Sider from "antd/es/layout/Sider"
import { MenuItemType } from "antd/es/menu/interface"
import Link from "next/link"
import './NavigationMenu.scss'
import { LogoIcon } from "@/shared/assets/Icon"
import { useState } from "react"
import MenuIcon from "@/shared/assets/Icon/MenuIcon/MenuIcon"
import { FFMenuIcon, ProfileIcon, StructureMenuIcon } from "@/shared/assets/Icon"
import { MenuFoldOutlined, MenuUnfoldOutlined, RightOutlined } from "@ant-design/icons"
import CollapsedIcon from "@/shared/assets/Icon/CollapsedIcon/CollapsedIcon"
// import StructureMenuIcon from "@/shared/assets/Icon"

const items: MenuItemType[] = [
    { key: 'logo', icon: <LogoIcon />, label: <Link style={{display: 'flex', alignItems: "center"}} href="#!" > RedFlag </Link>},
    { key: 'profile', icon: <ProfileIcon />, label: <Link href="#!" style={{ width: '10px' }} > Профиль </Link> },
    { key: 'structure', icon: <StructureMenuIcon />, label: <Link href="#!" style={{ width: '10px' }} > Структура орагнизации </Link> },
    { key: 'ffmenu', icon: <FFMenuIcon />, label: <Link href="#!" style={{ width: 'auto' }}> Меню с FF </Link> },
]
// className={`${window.location.pathname == '/personal/structure' && 'navigation-menu__item_selected'}`}
const NavigationMenu = () => {

    const [collapsed, setCollapsed] = useState(false)

    return (
            <Sider
                collapsedWidth={80}  
                style={{  
                    zIndex: 10, 
                    height: '100vh',
                    top: 0,
                    position: 'sticky',
                    boxShadow: '3px 0 10px var(--shadow)',
                    borderRight: '1px solid var(--border-for-nav-panel)',
                }} 
                collapsed={collapsed}
                >
                    <nav className={`navigation-menu ${collapsed ? 'navigation-menu_collapsed' : ''}`}>
                        <button className="navigation-menu__collapsing-button"
                            onClick={() => setCollapsed((prev) => !prev)}
                        >
                            
                            <RightOutlined 
                                className="collapsed-icon" 
                                style={collapsed ? {rotate: '180deg'} : {}}
                            />
                        </button>
                        <Menu 
                            items={items}
                            className="" 
                            mode="inline" 
                            inlineCollapsed={collapsed}
                        >
                        </Menu>
                    </nav>
                
            </Sider>
        
    )
}

export default NavigationMenu