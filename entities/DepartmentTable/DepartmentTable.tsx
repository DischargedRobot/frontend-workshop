'use client'

import './DepartmentTable.scss'

import DeleteIcon from "@/shared/Icon/DeleteIcon"
import NextLinkIcon from "@/shared/Icon/NextLinkIcon"
import {  Table, TableProps } from "antd"
import Link from "next/link"
import { TableData } from "./DepartmentTableType"

const COLUMNS: TableProps<TableData>['columns'] = [
  {
    title: '', 
    key: "delete",
    render: () => (
        <button onClick={()=> {}}><DeleteIcon/> </button>
    ),
    width: "64px",
  },
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
]



const rowSelection: TableProps<TableData>['rowSelection'] = {

}

interface Props {
    data: TableData[]
    isHidden: boolean
}

function handleClick(e: React.MouseEvent, record: TableData) {
  console.log(e, record)
}

const TableDepartment = (props: Props) => {

  const {
      data,
      isHidden,
  } = props

  return (
      <Table 
        rowSelection={{type: 'checkbox', ...rowSelection}}
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