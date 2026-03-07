'use client'

import DeleteIcon from "@/shared/Icon/DeleteIcon"
import NextLinkIcon from "@/shared/Icon/NextLinkIcon"
import { Space, Table, TableProps } from "antd"
import { RowSelectionType } from "antd/es/table/interface"
import Link from "next/link"

const COLUMNS: TableProps<TableData>['columns'] = [
  {
    title: '', 
    key: "delete",
    render: () => (
        <button onClick={()=> {}}><DeleteIcon/> </button>
    )
  },
  {
    title: 'Имя отдела',
    dataIndex: 'name',
    key: 'NameDepartment',
  },
  {
    title: '',
    dataIndex: 'link',
    render: (_, record) => (
      <Link href={record.link}><NextLinkIcon/></Link>
    ),
    key: 'link',
  },
]

export interface TableData {
  key: React.Key,
  name: string,
  link: string
}

const rowSelection: TableProps<TableData>['rowSelection'] = {

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
        <Table 
          rowSelection={{type: 'checkbox', ...rowSelection}}
          dataSource={data}
          columns={COLUMNS}>

        </Table>
    )
}

export default TableDepartment