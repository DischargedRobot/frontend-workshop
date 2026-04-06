"use client"
import "./StructureOrganisation.scss"
import { Content } from "antd/es/layout/layout"
import { FullUserList } from "@/widgets/FullUserList"
import { FullDepartmentTree } from "@/widgets/FullDepartmentTree"

const StructureOrganisation = () => {
	return (
		<Content className="structure-organisation">
			<FullDepartmentTree />
			<FullUserList />
		</Content>
	)
}

export default StructureOrganisation
