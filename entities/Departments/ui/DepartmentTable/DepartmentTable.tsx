"use client"

import "./DepartmentTable.scss"

import { Empty, Table } from "antd"
import { useDepartmentTableColumns } from "../../model"
import { useDepartmentTable } from "../../model/DepartmentTable"
import { NotFoundIcon } from "@/shared/assets/Icon/NotFoundIcon/NotFoundIcon"

const TableDepartment = () => {
	const { isHidden, departments, selectRow } = useDepartmentTable()
	const { columns, isLoading } = useDepartmentTableColumns()

	return (
		<Table
			rowClassName={"text-table text-table_litle text-table_tiny"}
			rowSelection={{
				type: "checkbox",
				onChange: (selectedRowKeys, selectedRows) =>
					selectRow(selectedRows),
			}}
			rowKey="id"
			expandable={{ childrenColumnName: "_NEVER_" }}
			dataSource={departments}
			columns={columns}
			pagination={{ placement: ["bottomCenter"], pageSize: 6 }}
			size="small"
			className={`department-table ${isHidden && "hidden"}`}
			locale={{

				emptyText: (!isLoading &&
					<Empty
						image={<NotFoundIcon />}
						description={
							<span style={{ color: "var(--text-color)" }}>
								{"Отделов нет"}
							</span>
						}
					/>
				),
			}}
		/>
	)
}

export default TableDepartment
