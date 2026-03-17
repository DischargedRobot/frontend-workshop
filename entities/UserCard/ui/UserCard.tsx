'use client'

import './UserCard.scss'

import Avatar from "@/shared/ui/Avatar"
import RoleList from "../../RoleList"
import { IUser } from "./types"
import { DeleteIcon } from '@/shared/assets/Icon'
import { memo, use, useCallback, useMemo, useState } from 'react'
import RoleStatus from '@/shared/model/RolesStatus/RolesStatus'
import { IRole } from '@/shared/model/Role'
import { PlusOutlined } from '@ant-design/icons'
import { useForm } from 'react-hook-form'
import useDepartmentsStore from '@/entities/Departments/model/useDepartmentsStore'
import UserDepartmentsDropDownMenu from '@/shared/model/UserDepartmentsDropDownMenu'
import { useUsersStore } from '@/entities/UserList/model'
import { useShallow } from 'zustand/shallow'

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
        control,
        setError,
    } = useForm<Pick<IUser, 'login' | 'password' | 'departmentId'>>(
        {defaultValues: {
            login: user.login,
            password: user.password,
            departmentId: user.departmentId,
        }}
    )
    
    const saveData = (data: Pick<IUser, 'login' | 'password' | 'departmentId'>) =>  {

        setUser({
            ...user,
            login: data.login, 
            password: data.password, 
            departmentId: data.departmentId
        })
        reset({
            login: data.login, 
            password: data.password, 
            departmentId: data.departmentId
        })
        console.log(data)
    }

    const resetData = () => {
        reset({
            login: user.login, 
            password: user.password, 
            departmentId: user.departmentId
    })}
    
    const [isLoading, setIsLoading] = useState(false)


    const [roleStatusIsHidden, setRoleStatusIsHidden] = useState(false)
    const [roles, setRoles] = useState<IRole[]>(user.roles)
    const [isSelected, setIsSelected] = useState(false)

    const deleteUserById = useUsersStore(state => state.deleteUserById)

    const changeStatusRole = useCallback((): void => {
        setRoles([...user.roles])
    }, [user.roles, setRoles])
    
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
                <label className='user-card__field'>
                    <input 
                        className='user-card__input'
                        type="text" 
                        placeholder="Логин"
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
                <label className='user-card__field'>
                    <input 
                        className='user-card__input'
                        type="text"
                        placeholder="Пароль"
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
                {/* //TODO: Сделать выбор выпадающим списком */}
                {/* <div style={{display: 'flex'}}>
                    <label onClick={() => console.log('s')}>
                        <input
                            placeholder='Отдел'
                            type='text'
                            name='department'
                            defaultValue={user.departmentId}
                        />
                    </label>
                </div> */}
                <UserDepartmentsDropDownMenu 
                    currentDepartment={user.departmentId} 
                    // setDepartment={(department) => {
                    //     console.log(user.departmentId)
                    //     }}
                    control={control}
                />
                {errors.departmentId?.message ?? ''}
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

export default memo(UserCard)