"use client"

import { TFeatureFlagTable } from "@/features/FFTableFilters/model/useFFTableFiltersStore"
import useFFTableFiltersStore from "@/features/FFTableFilters/model/useFFTableFiltersStore"
import "./FFTable.scss"

import { DeleteIcon, InfoIcon } from "@/shared/assets/Icon"
import { Empty, Switch, Table, TableProps } from "antd"
import { useFilteredFFs, useGetFFsFromServer } from "../model"
import { IFeatureFlag } from "../lib/types"
import { useFFTable } from "../model/useFFTable"

export type TFFTableColumns = TableProps<IFeatureFlag>["columns"]

const createFFTableColumns = (
	columnVisible: TFeatureFlagTable,
	removeFF: (FF: IFeatureFlag) => Promise<void>,
): TFFTableColumns => {
	return [
		{
			title: "Имя",
			key: "name",
			dataIndex: "name",
		},
		{
			hidden: !columnVisible.value.isVisible,
			align: "center",
			title: "Включён",
			key: "isEnabled",
			dataIndex: "isEnabled",
			render: (value) => <Switch defaultChecked={value}></Switch>,
		},
		{
			title: "Отдел/Проект",
			key: "departmentName",
			dataIndex: "departmentName",
			hidden: !columnVisible.departmentName.isVisible,
		},
		{
			align: "center",
			title: "Последнее изменение",
			key: "lastModified",
			dataIndex: "lastModified",
			hidden: !columnVisible.lastModified.isVisible,
		},
		{
			align: "center",
			title: "Описание",
			key: "description",
			dataIndex: "description",
			render: (value: string) => <InfoIcon info={value} />,
			hidden: !columnVisible.description.isVisible,
		},
		{
			align: "center",
			title: "",
			key: "delete",
			render: (_, FF) => (
				<button onClick={() => removeFF(FF)}>
					<DeleteIcon />
				</button>
			),
			width: "64px",
		},
	]
}
interface Props {
	featureFlags: IFeatureFlag[]
}
const FFTable = ({ featureFlags }: Props) => {
	const { isLoading } = useGetFFsFromServer()
	const filters = useFFTableFiltersStore((state) => state.visibleColumns)
	const { removeFF } = useFFTable()

	return (
		<Table
			className="ff-table"
			rowClassName={"text-table text-table_litle text-table_tiny"}
			size="small"
			rowKey="id"
			rowSelection={{ type: "checkbox" }}
			pagination={{ placement: ["bottomCenter"], pageSize: 8 }}
			dataSource={featureFlags}
			columns={createFFTableColumns(filters, removeFF)}
			tableLayout="fixed"
			loading={isLoading}
			locale={{
				emptyText: (
					<Empty
						image={Empty.PRESENTED_IMAGE_SIMPLE}
						description={
							<span style={{ color: "var(--text-color)" }}>
								{"Фич флагов нет :("}
							</span>
						}
					/>
				),
			}}
		/>
	)
}

export default FFTable
