'use client'
import { Button, Menu } from "antd"
import Sider from "antd/es/layout/Sider"
import { MenuItemType } from "antd/es/menu/interface"
import Link from "next/link"
import './NavigationMenu.scss'
import Image from "next/image"
import Logo from "@/shared/Logo/Logo"
import { useState } from "react"
import MenuIcon from "@/shared/Icon/MenuIcon/MenuIcon"


const items: MenuItemType[] = [
    { key: 'logo', icon: <Logo />, label: <Link href="#!"style={{ width: '10px' }} > RedFlag </Link>},
    { key: 'profile', icon: <Logo />,label: <Link href="#!" style={{ width: '10px' }} > Профиль </Link> },
    { key: 'structure', icon: <Logo />,label: <Link href="#!" style={{ width: '10px' }} > Структура орагнизации </Link> },
    { key: 'ffmenu', icon: <Logo />,label: <Link href="#!" style={{ width: 'auto' }}> Меню с FF </Link> },
]

const NavigationMenu = () => {

    const [collapsed, setCollapsed] = useState(false)

    return (
        <nav className="navigation-menu">
            <Sider style={{ height: '100%'}} collapsed={collapsed}>
                <Button
                    type="primary"
                    onClick={() => setCollapsed((prev) => !prev)}
                    icon={collapsed ? <MenuIcon closed={true} /> : <MenuIcon closed={false} />}
                />
                <Menu items={items}  style={{ minWidth: 0, flex: "auto" }}  mode="inline" inlineCollapsed={collapsed}>
                    {/* <Menu.Item> <Link href="#!"> Меню с FF </Link> </Menu.Item>
                    <Menu.Item> <Link href="#!"> Структура орагнизации </Link> </Menu.Item>
                    <Menu.Item> <Link href="#!"> Profile </Link> </Menu.Item> */}
                </Menu>
            </Sider>
        </nav>
        
    )
}

export default NavigationMenu