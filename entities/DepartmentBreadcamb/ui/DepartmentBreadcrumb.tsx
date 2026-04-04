"use client"

import "./DepartmentBreadcrumb.scss"

import { Breadcrumb } from "antd"
import { useDepartmentBreadcrumb } from "../model"

const DepartmentBreadcamb = () => {
	const { path, onBreadcrumbClick } = useDepartmentBreadcrumb()

	return (
		<Breadcrumb
			className="text text_litle text_bold"
			items={path.map((item, index) => ({
				title: (
					<button
						className="bredcamb"
						onClick={() => onBreadcrumbClick(item, index)}
					>
						{item.name}
					</button>
				),
			}))}
		/>
	)
}

export default DepartmentBreadcamb
