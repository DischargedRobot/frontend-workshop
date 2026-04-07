"use client"

import "./DepartmentTable.scss"

import { Table } from "antd"
import { useDepartmentTableColumns } from "../../model"
import { useDepartmentTable } from "../../model/DepartmentTable"

const TableDepartment = () => {
	const { isHidden, departments, selectRow } = useDepartmentTable()
	const { columns } = useDepartmentTableColumns()

	return (
		<Table
			rowClassName={"text-table text-table_litle text-table_tiny"}
			rowSelection={{
				type: "checkbox",
				onChange: (selectedRowKeys) =>
					selectRow(selectedRowKeys as number[]),
			}}
			rowKey="id"
			expandable={{ childrenColumnName: "_NEVER_" }}
			dataSource={departments}
			columns={columns}
			pagination={{ placement: ["bottomCenter"], pageSize: 6 }}
			size="small"
			className={`department-table ${isHidden && "hidden"}`}
		/>
	)
}

export default TableDepartment
