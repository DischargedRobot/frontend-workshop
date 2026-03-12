import './RolesStatus.scss'

import { Switch } from "antd"
import { IRole } from "../../Role/types"

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
                    <Switch onChange={(value) => {setRoles(roles) role.isEnabled = value}}></Switch>
                </li>
            })}
        </ul>
        
    )
}

export default RoleStatus