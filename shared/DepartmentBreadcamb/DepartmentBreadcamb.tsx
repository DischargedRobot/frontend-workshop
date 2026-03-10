'use client'

import { MouseEventHandler } from 'react'
import './DepartmentBreadcamb.scss'

import { Breadcrumb } from "antd"
import { useFFMenu } from '@/app/ffmenu/useFFMenu'
import { useShallow } from 'zustand/shallow'
// Promise<{featureFlags: string[]; departments: string[]}>

const DEPARTMENTS_REQUEST_URL = "http://local:3000/"

const DepartmentBreadcamb = () => {

    const {path, setPath, toDepartment} = useFFMenu(useShallow(state => ({path: state.path, setPath: state.setPath, toDepartment: state.toDepartment})))

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
                            toDepartment(paths)
                            }}
                    >
                        {item}
                    </button>
                    }   
                })}
        />
    )
}
export default DepartmentBreadcamb