'use client'

import { IRole } from "@/shared/model/Role"
import { DEFAULT_ROLES, NAMES_OF_ROLE_ACTIONS } from "@/shared/model/Role/types"
import { Switch } from "antd"

import { memo } from "react"

interface Props {
    roles?: IRole[]
    value?: IRole[]
    onChange: (allRoles: IRole[], changedRole: IRole) => void
}

const UserRolesList = ({ roles, value, onChange }: Props) => {
    const displayRoles = roles ?? value ?? DEFAULT_ROLES
    const handleRoleChange = (role: IRole, isEnabled: boolean) => {
        const updatedRole = { ...role, isEnabled }
        const updatedRoles = displayRoles.map((r) =>
            r.type === role.type ? updatedRole : r,
        )
        onChange(updatedRoles, updatedRole)
    }

    return (
        <ul className="add-user-roles__list">
            {displayRoles.map((role) => (
                <li key={role.type} className="add-user-roles__item">
                    <span className="text text_litle">
                        {NAMES_OF_ROLE_ACTIONS[role.type]}
                    </span>
                    <Switch
                        checked={role.isEnabled}
                        onChange={(checked) => handleRoleChange(role, checked)}
                    />
                </li>
            ))}
        </ul>
    )
}

export default memo(UserRolesList)