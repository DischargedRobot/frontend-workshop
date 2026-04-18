import React from 'react';
import { Menu } from 'antd';
import type { MenuProps } from 'antd';
import {
    UserOutlined,
    LockOutlined,
    PictureOutlined,
    SettingOutlined,
} from '@ant-design/icons';

const ChangeProfileMenu: React.FC<{
    selectedKey: string;
    onSelect: (key: string) => void;
}> = ({ selectedKey, onSelect }) => {
    const items: MenuProps['items'] = [
        { key: 'profile', icon: <UserOutlined />, label: 'Профиль' },
        { key: 'changePassword', icon: <LockOutlined />, label: 'Сменить пароль' },
        { key: 'theme', icon: <PictureOutlined />, label: 'Тема' },
    ];

    return (
        <Menu
            mode="inline"
            items={items}
            selectedKeys={[selectedKey]}
            onClick={({ key }) => onSelect(key)}
            style={{ width: 220 }}
        />
    );
};

export default ChangeProfileMenu;