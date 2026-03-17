'use client'

import './FullDepartmentTabe.scss'

import TableDepartment from "@/entities/Departments/ui/DepartmentTable/DepartmentTable"
import DepartmentBreadcamb from "@/entities/DepartmentBreadcamb/ui/DepartmentBreadcrumb"
import TableName from "@/shared/ui/TableName/TableName";
import { useDepartment } from './model/useDepartment';
import { useFFMenu } from '../../app/personal/ffmenu/useFFMenu';
import { useShallow } from 'zustand/shallow';
import { useEffect } from 'react';
import useBreadcrumbStore from '@/entities/DepartmentBreadcamb/model/useBreadcrumbStore';




const FullDepartmentTable = () => {

  const toDepartment  = useDepartment((state) => state.toDepartment)
  const {isHidden, setIsHidden} = useFFMenu(useShallow(state => ({isHidden: state.isHidden, setIsHidden: state.setIsHidden})))


    return (
        <div className="full-department-table">
            <DepartmentBreadcamb/>
            <TableName title="Отделы" isHidden={isHidden} setIsHidden={setIsHidden}/>
            <TableDepartment/>
        </div>
    )
}


export default FullDepartmentTable