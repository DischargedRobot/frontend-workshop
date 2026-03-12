import './RolesStatus.scss'

import { Switch } from "antd"
import { IRole } from "../../Role/types"
import { memo } from 'react';

interface Props {
    roles: IRole[];
    setRoles: (roles: IRole[]) => void
}

const RoleStatus = (props: Props) => {
    const {
        roles,
        setRoles,
    } = props

    return (
        <ul className="roles-status">
            {roles.map(role => {
                return <li key={role.type}>
                    {role.name}
                    <Switch value={role.isEnabled} onChange={(value) => {
                        role.isEnabled = value
                        setRoles([...roles]) 
                    }}/>
                </li>
            })}
        </ul>
        
    )
}

export default memo(RoleStatus)