'use client'

import './FullDepartmentTabe.scss'

import TableDepartment from "@/entities/DepartmentTable/DepartmentTable"
import { TableData } from "@/entities/DepartmentTable";
import DepartmentBreadcamb from "@/shared/DepartmentBreadcamb/DepartmentBreadcamb"
import TableName from "@/shared/TableName/TableName";
import { useDepartment } from './model/useDepartment';

const data: TableData[] = [
  {
    key: '1',
    name: 'Depart1',
    link: '12312',
  },
  {
    key: '2',
    name: 'Depart2',
    link: '#!',
  },
  {
    key: '3',
    name: 'Depart3',
    link: '#!',
  },  {
    key: '4',
    name: 'Depart1',
    link: '12312',
  },
  {
    key: '5',
    name: 'Depart2',
    link: '#!',
  },
  {
    key: '6',
    name: 'Depart3',
    link: '#!',
  },  {
    key: '7',
    name: 'Depart1',
    link: '12312',
  },
  {
    key: '8',
    name: 'Depart2',
    link: '#!',
  },
  {
    key: '9',
    name: 'Depart3',
    link: '#!',
  },  {
    key: '10',
    name: 'Depart1',
    link: '12312',
  },
  {
    key: '12',
    name: 'Depart2',
    link: '#!',
  },
  {
    key: '13',
    name: 'Depart3',
    link: '#!',
  },
];


const FullDepartmentTable = () => {

  const toDepartment  = useDepartment((state) => state.toDepartment)
  
    return (
        <div className="full-department-table">
            <DepartmentBreadcamb items={['depart1','depart1.1','depart1.1.1']} onClick={toDepartment}/>
            <TableName title="Отделы"/>
            <TableDepartment data={data}/>
        </div>
    )
}


export default FullDepartmentTable