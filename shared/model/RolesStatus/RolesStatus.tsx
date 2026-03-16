import './RolesStatus.scss'

import { Switch } from "antd"
import { IRole } from "../../Role/types"
import { memo } from 'react';

interface Props {
    roles: IRole[];
    setRoles: (roles: IRole[]) => void
}


const titles = ['Департаменты', 'Пользователи', 'Фич флаги']
const RoleStatus = (props: Props) => {
    const {
        roles,
        setRoles,
    } = props

    return (
        <ul className="roles-status">
            {Array.from({ length: 3 }).map((_, index) => (
                <li key={index} className='roles-status__containter'>
                    <h4>{titles[index]}</h4>
                    <hr/>
                    <ul className='roles-status__role-containter'>
                        {roles.slice(index*3,(index+1)*3).map(role => {
                            return <li key={role.type} className='roles-status__role'>
                                {role.name}
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