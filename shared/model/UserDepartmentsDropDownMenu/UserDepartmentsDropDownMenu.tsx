'use client'

import './UserDepartmentsDropDownMenu.scss'

import { IDepartment } from "@/entities/Departments/lib"
import { IUser } from '@/entities/UserCard/ui/types'
import { memo, useState } from "react"
import { Control, Controller } from 'react-hook-form'

interface Props {
    departments: IDepartment[]
    currentDepartment: number
    control: Control<Pick<IUser, 'login' | 'password' | 'departmentId'>>
}

const UserDepartmentsDropDownMenu = (props: Props) => {

    const {
        currentDepartment,
        departments,
        control,
    } = props

    console.log(currentDepartment, 'sss')
    const [isCollapsed, setIsCollapsed] = useState(false)

    const department = departments.find(dep => dep.id == currentDepartment)
    const [wantedNameDepartment, setWantedNameDepartment] = useState(department?.name ?? "")
    // const [choosenDepart, setChoosenDepart] = useState(currentDepartment)
    return (
        <Controller
            name='departmentId'
            control={control}
            rules={{
                validate: (value) => {
                    const isExisted = departments.some(department => department.id === value)
                    return isExisted || "Отдел не найдено"
                }   
            }}
            
            render = {({field}) =>(
            <div className={`user-departments-drop ${isCollapsed ? 'user-departments-drop_opened' : ''}`} style={{display: 'flex'}}>
                <label>
                    <input 
                        {...field}
                        placeholder='Отдел'
                        type='text'
                        value={wantedNameDepartment}
                        onClick={() => setIsCollapsed(true)}
                        onChange={(e) => {
                            setWantedNameDepartment(e.target.value)
                            field.onChange(e.target.value)
                        }}
                        onBlur={() => setIsCollapsed(false)}
                    />
                </label>
                <ul className={`user-departments-drop__list`}>
                    <div style={{padding: '5px', overflow: 'auto'}}>
                        {departments
                        .filter((department => (department.name.toLowerCase().includes(wantedNameDepartment.toLowerCase()))))
                        .map((department) => {
                            return <li 
                                className='user-departments-drop__item'
                                key={department.id}
                                onClick={() => {
                                    setIsCollapsed(prev => !prev)
                                    setWantedNameDepartment(department.name)
                                    // setDepartment(department)
                                    field.onChange(department)
                                }}
                            >
                                {department.name}
                            </li>
                        })}
                    </div>
                </ul>
            </div>
        )}/>
    )

}
export default memo(UserDepartmentsDropDownMenu)