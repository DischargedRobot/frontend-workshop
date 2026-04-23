"use client"

import "./FFTable.scss"

import { Empty, Spin, Table, TableProps } from "antd"
import { useGetFFsFromServer, useFFTable } from "../model"
import { IFeatureFlag } from "../lib/types"
import { NotFoundIcon } from "@/shared/assets/Icon/NotFoundIcon/NotFoundIcon"
import { Loader } from "@/_page/Loader"

export type TFFTableColumns = TableProps<IFeatureFlag>["columns"]

interface Props {
	featureFlags: IFeatureFlag[]
}

const FFTable = ({ featureFlags }: Props) => {
	const { isLoading } = useGetFFsFromServer()
	const { columns } = useFFTable()

	return (
		<Table
			bordered={false}
			className="ff-table"
			rowClassName={"text-table text-table_litle text-table_tiny"}
			size="small"
			rowKey="id"
			rowSelection={{ type: "checkbox" }}
			pagination={{ placement: ["bottomCenter"], pageSize: 8 }}
			dataSource={isLoading ? [] : featureFlags}
			columns={columns}
			tableLayout="fixed"
			locale={{
				emptyText: (isLoading
					?
					<div style={{ height: "100px", width: "100%" }}>
						<Spin />
					</div>
					:
					<Empty
						style={{ width: "100%" }}
						image={<NotFoundIcon />}
						description={
							<span style={{ color: "var(--text-color)" }}>
								{"Фич флагов нет"}
							</span>
						}
					/>
				),
			}}
		/>
	)
}

export default FFTable
