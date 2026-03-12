'use client'

import './UserCard.scss'

import Avatar from "@/shared/ui/Avatar"
import RoleList from "../RoleList"
import { IUser } from "./types"
import AddButton from "@/shared/AddButton"
import { PlusIcon } from '@/shared/assets/Icon'
import { useState } from 'react'
import RoleStatus from '@/shared/model/RolesStatus/RolesStatus'
import { IRole, TROLE } from '@/shared/Role'

interface Props {
    user: IUser
}


// const AddRole = () => {

// }

const UserCard = (props: Props) => {

    const [roleStatusIsHidden, setRoleStatusIsHidden] = useState(false)

    const {
        user
    } = props

    const [roles, setRoles] = useState<IRole[]>(user.roles)

    return (
        <div className="user-card">
            <span className='user-card__avatar'>
                <Avatar />
            </span>
            <form className='user-card__personal-data'>
                <label>
                    <input type="text" placeholder="Логин" defaultValue={user.login}/>
                </label>
                <label>
                    <input type="text" placeholder="Пароль" defaultValue={user.password}/>
                </label>
                <button type="submit">
                    Сохранить
                </button>
            </form>
            <div className='user-card__role-list'>
                <div className='role-list__title'>
                    <h2>Роли</h2>
                    <button onClick={() => {setRoleStatusIsHidden(prev => !prev)}}>
                        <PlusIcon/>
                    </button>
                    {roleStatusIsHidden && <RoleStatus roles={roles}/>}
                </div>
                
                <RoleList roles={roles.filter(role => role.isEnabled)}/>
            </div>
        </div>
    )
}

export default UserCard