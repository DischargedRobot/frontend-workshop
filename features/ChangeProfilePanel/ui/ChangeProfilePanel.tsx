"use client"

import "./ChangeProfileMenu.scss"

import React from 'react';
import { Menu } from 'antd';
import type { MenuProps } from 'antd';
import {
    UserOutlined,
    LockOutlined,
    PictureOutlined,
} from '@ant-design/icons';
import { Grid } from 'antd';

const { useBreakpoint } = Grid;

const ChangeProfileMenu: React.FC<{
    selectedKey: string;
    onSelect: (key: string) => void;
}> = ({ selectedKey, onSelect }) => {


    const screens = useBreakpoint();
    const isMobile = !screens.md;

    const items: MenuProps['items'] = [
        { key: 'profile', icon: <UserOutlined style={{ fontSize: isMobile ? 16 : "" }} />, label: isMobile ? '' : 'Профиль' },
        { key: 'changePassword', icon: <LockOutlined style={{ fontSize: isMobile ? 16 : "" }} />, label: isMobile ? '' : 'Сменить пароль' },
        { key: 'theme', icon: <PictureOutlined style={{ fontSize: isMobile ? 16 : "" }} />, label: isMobile ? '' : 'Тема' },
    ];
    return (
        <Menu
            mode={isMobile ? "horizontal" : "inline"}
            tooltip={isMobile ? false : { placement: "right" }}
            className="change-profile-menu"
            items={items}
            selectedKeys={[selectedKey]}
            onClick={({ key }) => onSelect(key)}
            style={{ width: 220 }}
            {...(isMobile && { disabledOverflow: true })} // чтобы при горизонтальном режиме не бегали кнопки
        />

    );
};

export default ChangeProfileMenu;