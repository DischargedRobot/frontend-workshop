"use client"
import "./StructureOrganization.scss"
import { Content } from "antd/es/layout/layout"
import { FullUserList } from "@/widgets/FullUserList"
import { FullDepartmentTree } from "@/widgets/FullDepartmentTree"

const StructureOrganization = () => {
	return (
		<Content className="structure-organization">
			<FullDepartmentTree />
			<FullUserList />
		</Content>
	)
}

export default StructureOrganization
