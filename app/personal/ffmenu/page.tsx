"use client"

import "./ffmenu.scss"

import { Content } from "antd/es/layout/layout"
import FullDepartmentTable from "@/widgets/FullDepartmentTable/FullDepartmentTable"
import { FullFeatureFlagsTable } from "@/widgets/FullFeatureFlagsTable"
import { Grid, Tabs } from "antd"

const { useBreakpoint } = Grid

const FFMenu = () => {
	const isMobile = !useBreakpoint().sm

	const items = [
		{ label: "Отделы", key: "departments", children: <FullDepartmentTable /> },
		{ label: "Feature Flags", key: "ff", children: <FullFeatureFlagsTable /> },
	]

	return (
		<Content className="ff-menu">
			{isMobile
				? <Tabs
					className="ff-menu__tabs"
					items={items}
				/>
				: <>
					<FullDepartmentTable />
					<FullFeatureFlagsTable />
				</>
			}
		</Content>
	)
}

export default FFMenu
