'use client'

import './Role.scss'

import { CloseOutlined } from "@ant-design/icons"
import { IRole } from "./types"
import { use } from 'react'

const Role = (role: IRole) => {

    return (
        <button className="role">
            <CloseOutlined/>
            {role.name}
        </button>
    )
}

export default Role