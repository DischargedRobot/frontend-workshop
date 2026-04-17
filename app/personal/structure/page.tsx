"use client"

import "./StructureOrganization.scss"

import { Content } from "antd/es/layout/layout"
import { FullUserList } from "@/widgets/FullUserList"
import { FullDepartmentTree } from "@/widgets/FullDepartmentTree"
import { Grid, Tabs } from "antd"

const { useBreakpoint } = Grid

const StructureOrganization = () => {

	const items = [
		{ label: "Структура", key: "structure", children: <FullDepartmentTree /> },
		{ label: "Пользователи", key: "users", children: <FullUserList /> },
	]

	const isMobile = !useBreakpoint().sm
	return (
		<Content className="structure-organization">
			{isMobile
				? <Tabs
					className="structure-organization__tabs title title_litle"
					items={items}
				/>
				: <>
					<FullDepartmentTree />
					<FullUserList />
				</>
			}
		</Content>
	)
}

export default StructureOrganization
