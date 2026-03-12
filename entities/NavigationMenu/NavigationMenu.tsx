'use client'
import { Button, Menu } from "antd"
import Sider from "antd/es/layout/Sider"
import { MenuItemType } from "antd/es/menu/interface"
import Link from "next/link"
import './NavigationMenu.scss'
import { LogoIcon } from "@/shared/assets/Icon"
import { useState } from "react"
import MenuIcon from "@/shared/assets/Icon/MenuIcon/MenuIcon"
import { FFMenuIcon, ProfileIcon, StructureMenuIcon } from "@/shared/assets/Icon"
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
        // <nav className="navigation-menu">
            <Sider
                collapsedWidth={64}  
                style={{  
                    height: '100vh',
                    top: 0,
                    position: 'sticky',
                    borderRight: '2px solid #45454bba'
                }} 
                collapsed={collapsed}>
                    {/* <nav> */}
                        <Button
                            type="primary"
                            onClick={() => setCollapsed((prev) => !prev)}
                            icon={collapsed ? <MenuIcon closed={true} /> : <MenuIcon closed={false} />}
                        />
                        {/* style={{ minWidth: 0, flex: "auto" }}  */}
                        <Menu 
                            items={items}
                            className="navigation-menu" 
                            mode="inline" 
                            inlineCollapsed={collapsed}>
                            {/* <Menu.Item> <Link href="#!"> Меню с FF </Link> </Menu.Item>
                            <Menu.Item> <Link href="#!"> Структура орагнизации </Link> </Menu.Item>
                            <Menu.Item> <Link href="#!"> Profile </Link> </Menu.Item> */}
                        </Menu>
                    {/* </nav> */}
                
            </Sider>
        // </nav>
        
    )
}

export default NavigationMenu