'use client'
import './RoleList.scss'

import Role, { IRole, TROLE } from "@/shared/Role"

interface Props {
    roles: IRole[]
}

const RoleList = (props: Props) => {

    const {
        roles,
    } = props

    return (
        <ul className="role-list">
            {roles.map(role => (
                <li key={crypto?.randomUUID()}>
                    {Role(role)}
                </li>
            ))} 
        </ul>
    )
}

export default RoleList