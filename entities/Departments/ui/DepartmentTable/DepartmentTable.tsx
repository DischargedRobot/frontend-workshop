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
import { Department } from '../../lib/DepartmentType'
import useBreadcrumbStore from '@/entities/DepartmentBreadcamb/model/useBreadcrumbStore'



const createColumns = (
  nextDepartment: (dep: IDepartment) => void
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
      onClick={() => nextDepartment(department)}><NextLinkIcon/></button>
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
  const columns = createColumns(useBreadcrumbStore(state => state.addDepartment))
  const department = useBreadcrumbStore(state => state.path.at(-1))
  const setSelectedDepartments = useFFFiltersStore(state => state.setDepartment)
  return (
    // TODO:  onSelect: (__, _, records) => {console.log(records)}}
    
      <Table 
        rowClassName={'text_litle'}
        rowSelection={{type: 'checkbox', onChange: (selectedRowKeys) => setSelectedDepartments(selectedRowKeys as number[])}}
        rowKey='id'
        expandable={{
          rowExpandable: () => false,
          expandIcon: () => false        
        }}
        dataSource={department?.children}
        columns={columns}
        pagination={{ placement: ['bottomCenter'], pageSize: 6 }}
        size="small"
        className={`department-table ${isHidden && 'hidden'}`}
        tableLayout={"auto"}
        >
      </Table>
  )
}

export default TableDepartment