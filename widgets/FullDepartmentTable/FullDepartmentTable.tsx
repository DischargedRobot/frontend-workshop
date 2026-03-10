'use client'

import './FullDepartmentTabe.scss'

import TableDepartment from "@/entities/DepartmentTable/DepartmentTable"
import type { TableData } from "@/entities/DepartmentTable";
import DepartmentBreadcamb from "@/shared/DepartmentBreadcamb/DepartmentBreadcamb"
import TableName from "@/shared/TableName/TableName";
import { useDepartment } from './model/useDepartment';
import { useFFMenu } from '../../app/ffmenu/useFFMenu';
import { useShallow } from 'zustand/shallow';

const data: TableData[] = [
  {
    key: '1',
    name: 'Depart1',
    link: '12312',
    children: [],
    featureFlags: [],
  },
  {
    key: '2',
    name: 'Depart2',
    link: '#!',    children: [],
    featureFlags: [],
  },
  {
    key: '3',
    name: 'Depart3',
    link: '#!',
      children: [],
    featureFlags: [],
  },  {
    key: '4',
    name: 'Depart1',
    link: '12312',    children: [],
    featureFlags: [],
  },
  {
    key: '5',
    name: 'Depart2',
    link: '#!',    children: [],
    featureFlags: [],
  },
  {
    key: '6',
    name: 'Depart3',
    link: '#!',    children: [],
    featureFlags: [],
  },  {
    key: '7',
    name: 'Depart1',
    link: '12312',    children: [],
    featureFlags: [],
  },
  {
    key: '8',
    name: 'Depart2',
    link: '#!',    children: [],
    featureFlags: [],
  },
  {
    key: '9',
    name: 'Depart3',
    link: '#!',    children: [],
    featureFlags: [],
  },  {
    key: '10',
    name: 'Depart1',
    link: '12312',    children: [],
    featureFlags: [],
  },
  {
    key: '12',
    name: 'Depart2',
    link: '#!',    children: [],
    featureFlags: [],
  },
  {
    key: '13',
    name: 'Depart3',
    link: '#!',    children: [],
    featureFlags: [],
  },
];


const FullDepartmentTable = () => {

  const toDepartment  = useDepartment((state) => state.toDepartment)
  const {isHidden, setIsHidden} = useFFMenu(useShallow(state => ({isHidden: state.isHidden, setIsHidden: state.setIsHidden})))
  
    return (
        <div className="full-department-table">
            <DepartmentBreadcamb items={['depart1','depart1.1','depart1.1.1']} onClick={toDepartment}/>
            <TableName title="Отделы" isHidden={isHidden} setIsHidden={setIsHidden}/>
            <TableDepartment data={data} isHidden={isHidden}/>
        </div>
    )
}


export default FullDepartmentTable