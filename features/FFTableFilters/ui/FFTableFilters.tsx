import "./FFTableFilters.scss"
// import useFFFiltersStore from "@/entities/FFTable/model/useFFFiltersStore"
import useFFTableFiltersStore from "../model/useFFTableFiltersStore"
import { Popover, Switch } from "antd"
import { FilterOutlined } from "@ant-design/icons"
import { useState } from "react"

const FFTableFilters = ({ className }: { className?: string }) => {
	const columns = useFFTableFiltersStore((state) => state.visibleColumns)
	const toggle = useFFTableFiltersStore((state) => state.toggleVisibleColumn)


	const content = (
		<div
			className={`ff-table-filters${className ? ` ${className}` : ""}`}
		>
			<ul
				className={`ff-table-filters__panel  `}
			>
				{Object.entries(columns).map(([key, column]) => (
					<li key={key}>
						<Switch
							checked={column.isVisible}
							onChange={() => toggle(key as keyof typeof columns)}
						/>
						<span className="text">{column.name}</span>
					</li>
				))}
			</ul>
		</div>
	)
	return (
		<Popover
			autoAdjustOverflow
			placement="top"

			content={content}
			trigger="click"
		>
			<button
				className="ff-table-filters__button"
			>
				<FilterOutlined />
			</button>
		</Popover>

	)
}

export default FFTableFilters
