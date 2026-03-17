'use client'

import './DepartmentBreadcrumb.scss'

import { Breadcrumb } from "antd"
import { useFFMenu } from '@/app/personal/ffmenu/useFFMenu'
import { useShallow } from 'zustand/shallow'
import useBreadcrumbStore from '../model/useBreadcrumbStore'
import { useEffect } from 'react'
import useDepartmentsStore from '@/entities/Departments/model/useDepartmentsStore'
// Promise<{featureFlags: string[]; departments: string[]}>

const DEPARTMENTS_REQUEST_URL = "http://local:3000/"

const DepartmentBreadcamb = () => {

    // const toDepartment = useFFMenu(state => state.toDepartment)

    const path = useBreadcrumbStore(state => state.path)
    const setPath = useBreadcrumbStore(state => state.setPath)
    
    const rootDepartment = useDepartmentsStore(state => state.departments[0])

    useEffect(() => {
        setPath([rootDepartment])
    }, [])

    return (
        <Breadcrumb 
            items={path.map((item, index, arr) => 
                {
                const paths = DEPARTMENTS_REQUEST_URL+arr.slice(0,index+1).join('/')
                return {title: 
                    <button 
                        className='bredcamb' 
                        onClick={() => {
                            setPath(path.slice(0,index+1)); 
                            console.log(path)
                            // toDepartment(paths)
                            }}
                    >
                        {item.name}
                    </button>
                    }   
                })}
        />
    )
}
export default DepartmentBreadcamb