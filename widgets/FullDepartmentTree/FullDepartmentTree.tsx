'use client'

import './FullDepartmentTree.scss'

import DepartmentTree from "@/entities/Departments/ui/DepartmentTree/DepartmentTree"
import { PlusCircleOutlined } from "@ant-design/icons";
import { useState } from "react";
import { DeleteIcon } from '@/shared/assets/Icon';
import useDepartmentsStore from '@/entities/Departments/model/useDepartmentsStore';
import { useUserFiltersStore, useUsersStore } from '@/entities/UserList/model';
import useOrganisationStore from '@/entities/Organisation/model/useOrganisationStore';
import { IDepartment } from '@/entities/Departments/lib';
import AddDepartment from '@/features/AddDepartment/ui/AddDepartment';

const FullDepartmentTree = () => {

    const [isCollapsed, setIsCollapsed] = useState(false)

    const removeSelectedDepartment = useDepartmentsStore(state => state.removeSelectedDepartment)
    const users = useUsersStore(state => state.users)
    const setUsers = useUsersStore(state => state.setUsers)
    const addDepartment = useDepartmentsStore(state => state.addDepartment)
    const selectedDepartments = useUserFiltersStore(state => state.departmentIds)

    const deleteDepartmentsFromUsers = () => {
        setUsers(users.map((user) => {
            if (user.departmentId != undefined && selectedDepartments.includes(user.departmentId)) {
                return {...user, departmentId: undefined}
            }
            return user
        }))
    }

    const addNewDepartment = (department: IDepartment) => {
        addDepartment(department) 
    }

    
    const organisation = useOrganisationStore(state => state.organisation)

    return (
        <div className={`department-tree ${isCollapsed && 'collapsed'}`}>
            <div className='department-tree__title'>
                <h2>{organisation.name}</h2>
                <div className='department-tree__buttons'>
                    <AddDepartment/>
                    <button onClick={() => {
                            removeSelectedDepartment()
                            deleteDepartmentsFromUsers()
                        }}
                    >
                        <DeleteIcon/>
                    </button>
                </div>
            </div>
            {/* <button className='department-tree__button' onClick={() => {console.log(isCollapsed); setIsCollapsed(prev => !prev)}}>
                <CollapsedIcon isCollapsed={isCollapsed} />
            </button> */}
            <DepartmentTree/>
        </div>
    )
}

export default FullDepartmentTree