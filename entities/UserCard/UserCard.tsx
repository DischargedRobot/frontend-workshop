'use client'

import './UserCard.scss'

import Avatar from "@/shared/ui/Avatar"
import RoleList from "../RoleList"
import { IUser } from "./types"
import { DeleteIcon, PlusIcon } from '@/shared/assets/Icon'
import { useCallback, useMemo, useRef, useState } from 'react'
import RoleStatus from '@/shared/model/RolesStatus/RolesStatus'
import { IRole } from '@/shared/Role'
import { useUsers } from '../UserList'
import { PlusOutlined } from '@ant-design/icons'
import { useForm } from 'react-hook-form'
import { FormValues } from '../RegistraionForm/RegistrationForm'
import Password from 'antd/es/input/Password'

interface Props {
    user: IUser
    setUser: (user: IUser) => void
}

const UserCard = (props: Props) => {

    const {
        user,
        setUser,
    } = props

    const {
        register,
        handleSubmit,
        formState: { errors, isDirty},
        reset,
    } = useForm<Pick<IUser, 'login' | 'password'>>()
    
    const saveData = (data: Pick<IUser, 'login' | 'password'>) =>  {
        setUser({
            ...user,
            login: data.login, 
            password: data.login, 
    })}

    const resetData = () => {
        reset({login: user.login, password: user.password})
    }
    
    const [isLoading, setIsLoading] = useState(false)

    const [roleStatusIsHidden, setRoleStatusIsHidden] = useState(false)
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
            <form 
                className='user-card__personal-data' 
                onSubmit={handleSubmit(saveData)}
                >
                <label>
                    <input 
                        type="text" 
                        placeholder="Логин"
                        defaultValue={user.login}
                        {...register('login', {
                            minLength: {
                                value: 1,
                                message: "Имя должно содержать хотя бы 1 символ",
                            },
                            required: "Это поле обязательно для заполнения",
                        })}
                        />
                        {errors.login?.message?.toString()}
                </label>
                <label>
                    <input 
                        type="text"
                        placeholder="Пароль"
                        defaultValue={user.password}
                        {...register('password', {
                            minLength: {
                                value: 6,
                                message: "Размер пароля должен быть больше 6"
                            },
                            maxLength: {
                                value: 25,
                                message: "Размер пароля должен быть меньше 25"
                            },
                            required: "Это поле обязательно для заполнения",
                        })}
                    />
                    {errors.password?.message?.toString()}
                </label>
                <div>
                    <button 
                        className={!isDirty ? 'disabled' : ''}
                        type="submit"
                        disabled={!isDirty}
                    >
                        Сохранить
                    </button>
                    <button 
                        className={!isDirty ? 'disabled' : ''}
                        disabled={!isDirty}
                        onClick={resetData}
                    >
                        Отменить
                    </button>
                </div>
            </form>
            <div className='user-card__role-list'>
                <div className='role-list__title'>
                    <h2>Роли</h2>
                    <button className='add-role' onClick={() => {setRoleStatusIsHidden(prev => !prev)}}>
                        <PlusOutlined/>
                    </button>
                    {roleStatusIsHidden && <RoleStatus setRoles={setRoles} roles={roles}/>}
                </div>
                
                <RoleList roles={filterRoleList} changeRoles={changeStatusRole}/>
            </div>
        </div>
    )
}

export default UserCard