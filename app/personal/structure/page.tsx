"use client"
import "./StructureOrganisation.scss"
import { Content } from "antd/es/layout/layout"
import { FullUserList } from "@/widgets/FullUserList"
import { FullDepartmentTree } from "@/widgets/FullDepartmentTree"
import { useApplicationStore } from "@/shared/model/Application"

const StructureOrganisation = () => {
	// const isLoading = useApplicationStore((state) => state.isLoading)

	// if (isLoading) {
	// 	return <Content className="structure-organisation">Loading...</Content>
	// }

	return (
		<Content className="structure-organisation">
			<FullDepartmentTree />
			<FullUserList />
		</Content>
	)
}

export default StructureOrganisation
