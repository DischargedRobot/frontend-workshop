'use client'

import { Space, Table, TableProps } from "antd"
import Link from "next/link"

const COLUMNS: TableProps<TableData>['columns'] = [
  {
    title: 'Action', 
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <button onClick={(e) => handleClick(e, record)}>Invite {record.name}</button>
        <button onClick={()=> {}}> Delete</button>
      </Space>
    )
  },
  {
    title: 'NameDepartment',
    dataIndex: 'name',
    key: 'NameDepartment',
  },
  {
    title: 'RoleName',
    dataIndex: 'roleName',
    key: 'RoleName',
  },
  {
    title: 'link',
    dataIndex: 'link',
    render: (_, record) => (
      <Link href={record.link}>{record.link}</Link>
    ),
    key: 'link',
  },
]

export interface TableData {
  key: React.Key,
  name: string,
  roleName: string,
  link: string
}

interface Props {
    data: TableData[]
}

function handleClick(e: React.MouseEvent, record: TableData) {
  console.log(e, record)
}

const TableDepartment = (props: Props) => {

    const {
        data 
    } = props

    return (
        <Table dataSource={data} columns={COLUMNS}>

        </Table>
    )
}

export default TableDepartment