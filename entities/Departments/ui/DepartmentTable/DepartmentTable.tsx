'use client'

import './DepartmentTable.scss'

import DeleteIcon from "@/shared/assets/Icon/DeleteIcon"
import NextLinkIcon from "@/shared/assets/Icon/NextLinkIcon"
import {  Table, TableProps } from "antd"
import Link from "next/link"
import { TableData } from "../../lib/DepartmentType"
import { useFFMenu } from '@/app/personal/ffmenu/useFFMenu'
import { useShallow } from 'zustand/shallow'
import useDepartmentsStore from '../../model/useDepartmentsStore'
import useFilteredFFs from '@/entities/FFTable/model/useFilteredFFs'
import useFFFiltersStore from '@/entities/FFTable/model/useFFFiltersStore'

const COLUMNS: TableProps<TableData>['columns'] = [

  {
    title: 'Имя отдела',
    dataIndex: 'name',
    key: 'NameDepartment',
    minWidth: 100,
  },
  {
    title: '',
    dataIndex: 'link',
    render: (_, record) => (
      <Link href={record.link}><NextLinkIcon/></Link>
    ),
    key: 'link',
    width: "64px",
  },
  {
    title: '', 
    key: "delete",
    render: () => (
        <button onClick={()=> {}}><DeleteIcon/> </button>
    ),
    width: "64px",
  },
]



// const rowSelection: TableProps<TableData>['rowSelection'] = {

// }

interface Props {
    data: TableData[]
    isHidden: boolean
}

function handleClick(e: React.MouseEvent, record: TableData) {
  console.log(e, record)
}

const TableDepartment = () => {

  const departments = useFFMenu(state => state.departments)
  const data: TableData[] = departments.map((department) => ({...department}))
  
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
  const setSelectedDepartments = useFFFiltersStore(state => state.setDepartment)
  return (
    // TODO:  onSelect: (__, _, records) => {console.log(records)}}
    
      <Table 
        rowSelection={{type: 'checkbox', onChange: (selectedRowKeys) => setSelectedDepartments(selectedRowKeys)}}
        rowKey='id'
        dataSource={data}
        columns={COLUMNS}
        pagination={{ placement: ['bottomCenter'], pageSize: 6 }}
        size="small"
        className={`department-table ${isHidden && 'hidden'}`}
        tableLayout={"auto"}
        >
      </Table>
  )
}

export default TableDepartment