'use client'
import { memo } from 'react'
import './RoleList.scss'

import Role, { IRole } from "@/shared/model/Role"

interface Props {
    roles: IRole[]
    changeRoles: () => void
}

const RoleList = (props: Props) => {

    const {
        roles,
        changeRoles,
    } = props

    return (
        <ul className="role-list">
            {roles.map(role => (
                <li key={crypto?.randomUUID()}>
                    <Role role={role} onClick={() => {
                        role.isEnabled = false
                        changeRoles()
                    }}/>
                </li>
            ))} 
        </ul>
    )
}

export default memo(RoleList)