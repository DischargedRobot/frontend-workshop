'use client'

import './DepartmentTable.scss'

import DeleteIcon from "@/shared/assets/Icon/DeleteIcon"
import NextLinkIcon from "@/shared/assets/Icon/NextLinkIcon"
import {  Table, TableProps } from "antd"
import Link from "next/link"
import { useFFMenu } from '@/app/personal/ffmenu/useFFMenu'
import useDepartmentsStore from '../../model/useDepartmentsStore'
import useFFFiltersStore from '@/entities/FFTable/model/useFFFiltersStore'
import { IDepartment, TableData } from '../../lib'
import useBreadcrumbStore from '@/entities/DepartmentBreadcamb/model/useBreadcrumbStore'



const createColumns = (
  addDepartmentToBredcrumb: (department: IDepartment) => void,
  addDepartmentForFFFilters: (department: IDepartment) => void,
): TableProps<IDepartment>['columns'] => [
  {
    title: 'Имя отдела',
    dataIndex: 'name',
    key: 'NameDepartment',
    minWidth: 100,
  },
  {
    title: '',
    dataIndex: 'link',
    render: (_, department) => (
      <button
      onClick={() => {
        addDepartmentToBredcrumb(department)
        addDepartmentForFFFilters(department)
      }}><NextLinkIcon/></button>
    ),
    key: 'link',
    width: "64px",
  },
  {
    title: '', 
    key: "delete",
    render: () => (
        <button style={{alignItems: 'center'}} onClick={()=> {}}><DeleteIcon/> </button>
    ),
    width: "64px",
    align: 'center',
    
  },
]



// const rowSelection: TableProps<TableData>['rowSelection'] = {

// }

function handleClick(e: React.MouseEvent, record: TableData) {
  console.log(e, record)
}

const TableDepartment = () => {

  const isHidden: boolean = useFFMenu(state => state.isHidden)

  // const {
  //   data, 
  //   isHidden
  // }: Props = useFFMenu(
  //   useShallow(
  //   (state) => ({
  //     data: state.departments.map((item) => ({...item, key: item.id })),
  //     isHidden: state.isHidden
  //   })))
  const columns = createColumns(
    useBreadcrumbStore(state => state.addDepartment), 
    useFFFiltersStore(state => state.addDepartmentAndItChildren)
  )
  const departments = useBreadcrumbStore(state => state.path)
  const setSelectedDepartments = useFFFiltersStore(state => state.setDepartment)

  const selectRow = (selectedRowKeys: number[]) => {
    console.log(selectedRowKeys, departments)
    if (selectedRowKeys.length === 0) {
      setSelectedDepartments([...departments.map(dep => dep.id), ...departments.at(-1)!.children.map(dep => dep.id)])
    } else {
      setSelectedDepartments(selectedRowKeys as number[])
    }
  }

  return (
    // TODO:  onSelect: (__, _, records) => {console.log(records)}}
    
      <Table 
        rowClassName={'text text_litle text_tiny'}
        rowSelection={{
          type: 'checkbox', 
          onChange: (selectedRowKeys) => selectRow(selectedRowKeys as number[])}}
        rowKey='id'
        expandable={{
          // отключает связь с потомками элементов при их выборе, чтобы когда выбрали всех в таблице, мы не брали ещё и их потомков
          childrenColumnName: '_NEVER_',
          // rowExpandable: () => false,
          // expandIcon: () => false        
        }}
        dataSource={departments.at(-1)?.children}
        columns={columns}
        pagination={{ placement: ['bottomCenter'], pageSize: 6 }}
        size="small"
        className={`department-table ${isHidden && 'hidden'}`}
        >
      </Table>
  )
}

export default TableDepartment