"use client"

import "./FFTable.scss"

import { Empty, Table, TableProps } from "antd"
import { useGetFFsFromServer, useFFTable } from "../model"
import { IFeatureFlag } from "../lib/types"
import { NotFoundIcon } from "@/shared/assets/Icon/NotFoundIcon/NotFoundIcon"

export type TFFTableColumns = TableProps<IFeatureFlag>["columns"]

interface Props {
	featureFlags: IFeatureFlag[]
}

const FFTable = ({ featureFlags }: Props) => {
	const { isLoading } = useGetFFsFromServer()
	const { columns } = useFFTable()

	return (
		<Table
			className="ff-table"
			rowClassName={"text-table text-table_litle text-table_tiny"}
			size="small"
			rowKey="id"
			rowSelection={{ type: "checkbox" }}
			pagination={{ placement: ["bottomCenter"], pageSize: 8 }}
			dataSource={featureFlags}
			columns={columns}
			tableLayout="fixed"
			loading={{ description: "Загрузка...", spinning: isLoading }}
			locale={{

				emptyText: (!isLoading &&
					<Empty
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
