"use client"

import "./DepartmentTable.scss"

import { Table } from "antd"
import { useFFMenu } from "@/app/personal/ffmenu/useFFMenu"
import { useDepartmentsStore } from "../../model/useDepartmentsStore"
import { useFFFiltersStore } from "@/entities/FF"
import { IDepartment } from "../../lib"
import { useBreadcrumbStore } from "@/entities/DepartmentBreadcamb"
import { useShallow } from "zustand/shallow"
import { useDepartmentTableColumns } from "../../model"

const getChildrenByPath = (
	departments: IDepartment[],
	departmentPath: IDepartment[] | undefined,
): IDepartment[] => {
	if (departmentPath === undefined) return []

	let children = departments
	for (let i = 0; i < departmentPath.length; i++) {
		const currentDep = children.find(
			(dep) => departmentPath[i].id == dep.id,
		)
		if (currentDep === undefined) return []
		children = currentDep.children
	}

	return children
}

const TableDepartment = () => {
	const isHidden: boolean = useFFMenu((state) => state.isHidden)

	const departmentPath = useBreadcrumbStore(useShallow((state) => state.path))

	const departments = useDepartmentsStore(
		useShallow((state) =>
			getChildrenByPath(state.departments, departmentPath),
		),
	)

	const { columns } = useDepartmentTableColumns()

	const setSelectedDepartments = useFFFiltersStore(
		(state) => state.setDepartment,
	)

	const selectRow = (selectedRowKeys: number[]) => {
		if (selectedRowKeys.length === 0) {
			setSelectedDepartments([
				...departmentPath.map((dep) => dep.id),
				...departmentPath.at(-1)!.children.map((dep) => dep.id),
			])
		} else {
			setSelectedDepartments(selectedRowKeys as number[])
		}
	}

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
