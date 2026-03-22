'use client'

import './FullDepartmentTree.scss'

import {DepartmentTree} from "@/entities/Departments"
import { useState } from "react";
import useDepartmentsStore from '@/entities/Departments/model/useDepartmentsStore';
import useOrganisationStore from '@/entities/Organisation/model/useOrganisationStore';
import { IDepartment } from '@/entities/Departments/lib';
import AddDepartment from '@/features/AddDepartment/ui/AddDepartment';
import useFullDepartmentTree from './model/useFullDepartmentTree';
import DeleteDepartment from '@/features/DeleteDepartment/ui/DeleteDepartment';

const FullDepartmentTree = () => {

    // const organisationId = useOrganisationStore(state => state.organisation.id)
    // const {data: departments} = useSWR(['organisation', organisationId], () => departmentApi.getDepartmentsByOrganisation(organisationId))
    // const setDepartments= useDepartmentsStore(state => state.setDepartments)

    // useEffect(() => {
    //    if (departments !== undefined) {
    //         setDepartments(departments)
    //     }
    // }, [departments, setDepartments])

    useFullDepartmentTree();
    
    const [isCollapsed, setIsCollapsed] = useState(false)

    const removeDep = () => {

    }
   const addDepartment = useDepartmentsStore(state => state.addDepartment)
    // const selectedDepartments = useUserFiltersStore(state => state.departmentIds)



    const addNewDepartment = (department: IDepartment) => {
        addDepartment(department) 
    }

    
    const organisation = useOrganisationStore(state => state.organisation)

    return (
        <div className={`department-tree ${isCollapsed && 'collapsed'}`}>
            <div style={{position: 'sticky', top: '10px'}}>
            <div style={{display: 'flex', flexDirection: 'column', gap: "10px"}}>
                <div className='department-tree__title title text_big'>
                    <h2>{organisation.name}</h2>
                    <div className='department-tree__buttons'>
                        <AddDepartment/>
                        <DeleteDepartment/>
                    </div>
                </div>
                {/* <button className='department-tree__button' onClick={() => {console.log(isCollapsed); setIsCollapsed(prev => !prev)}}>
                    <CollapsedIcon isCollapsed={isCollapsed} />
                </button> */}
                <DepartmentTree/>
            </div>
            
            </div>
        </div>
    )
}

export default FullDepartmentTree