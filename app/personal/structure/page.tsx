"use client"

import "./StructureOrganization.scss"

import { Content } from "antd/es/layout/layout"
import { FullUserList } from "@/widgets/FullUserList"
import { FullDepartmentTree } from "@/widgets/FullDepartmentTree"
import { Tabs } from "antd"
const StructureOrganization = () => {

	const items = [
		{ label: "Структура", key: "structure", children: <FullDepartmentTree /> },
		{ label: "Пользователи", key: "users", children: <FullUserList /> },
	]

	return (
		<Content className="structure-organization">
			<Tabs
				className="structure-organization__tabs"
				items={items}
			/>
		</Content>
	)
}

export default StructureOrganization
