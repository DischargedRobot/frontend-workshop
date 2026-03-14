'use client'

import './UserCard.scss'

import Avatar from "@/shared/ui/Avatar"
import RoleList from "../RoleList"
import { IUser } from "./types"
import { DeleteIcon, PlusIcon } from '@/shared/assets/Icon'
import { useCallback, useMemo, useState } from 'react'
import RoleStatus from '@/shared/model/RolesStatus/RolesStatus'
import { IRole } from '@/shared/Role'
import { useUsers } from '../UserList'

interface Props {
    user: IUser
}



const UserCard = (props: Props) => {

    const {
        user
    } = props

    const [roleStatusIsHidden, setRoleStatusIsHidden] = useState(false)
    const [isChanged, setIsChanged] = useState(false)
    const [roles, setRoles] = useState<IRole[]>(user.roles)
    const [isSelected, setIsSelected] = useState(false)

    const deleteUserById = useUsers(state => state.deleteUserById)

    const changeStatusRole = useCallback((): void => {
        setRoles([...user.roles])
    }, [user.roles])
    
    const filterRoleList = useMemo(() => roles.filter(role => role.isEnabled), [roles])
    console.log('user card')
    return (
        <div className={`user-card ${isSelected ? 'user-card_selected' : ''}`}>
            <button 
                className='user-card__circle-selection'
                onClick={() => setIsSelected(prev => !prev)}
            />
            <span className='user-card__avatar'>
                <Avatar />
                <button className='user-card__delete-button' onClick={() => {deleteUserById(user.id)}}>
                    <DeleteIcon/>
                </button>
            </span>
            <form className='user-card__personal-data'>
                <label>
                    <input 
                        type="text" 
                        placeholder="Логин"
                        defaultValue={user.login}
                        onChange={() => {setIsChanged(true)}}
                        />
                </label>
                <label>
                    <input 
                        type="text"
                        placeholder="Пароль"
                        defaultValue={user.password}
                        onChange={() => {setIsChanged(true)}}
                    />
                </label>
                <button 
                    className={!isChanged ? 'disabled' : ''}
                    type="submit"
                    disabled={!isChanged}
                    onClick={()=>{}}
                >
                    Сохранить
                </button>
            </form>
            <div className='user-card__role-list'>
                <div className='role-list__title'>
                    <h2>Роли</h2>
                    <button onClick={() => {setRoleStatusIsHidden(prev => !prev)}}>
                        <PlusIcon/>
                    </button>
                    {roleStatusIsHidden && <RoleStatus setRoles={setRoles} roles={roles}/>}
                </div>
                
                <RoleList roles={filterRoleList} changeRoles={changeStatusRole}/>
            </div>
        </div>
    )
}

export default UserCard