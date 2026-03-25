import './RolesStatus.scss'

import { Switch } from "antd"
import { IRole, ROLE_NAMES, TROLE } from "../Role/types"
import { memo } from 'react';

interface Props {
    roles: IRole[];
    setRoles: (roles: IRole[]) => void
}


const titles = ['Отделы', 'Пользователи', 'Фич флаги']

const RoleStatus = (props: Props) => {
    const {
        roles,
        setRoles,
    } = props

    return (
        <ul className="roles-status">
            {Array.from({ length: 3 }).map((_, index) => (
                <li key={index} className='roles-status__containter'>
                    <h4 className='title title_very-litle'>{titles[index]}</h4>
                    <hr/>
                    <ul className='roles-status__role-containter text text text_tiny'>
                        {roles.slice(index*3,(index+1)*3).map(role => {
                            return <li key={role.type} className='roles-status__role'>
                                {ROLE_NAMES[role.type]}
                                <Switch value={role.isEnabled} onChange={(value) => {
                                    role.isEnabled = value
                                    setRoles([...roles]) 
                                }}/>
                            </li>
                        })}
                    </ul>
                </li>
            ))}
        </ul>
        
    )
}

export default memo(RoleStatus)