
import "./StructureOrganization.scss"

import { Content } from "antd/es/layout/layout"
import { FullUserList } from "@/widgets/FullUserList"
import { FullDepartmentTree } from "@/widgets/FullDepartmentTree"
import { functionInitApplication } from "../functionInitApplication"
import { userApiServer } from "@/entities/User/api/userApiServer"
import { InitStructureOrganization } from "./InitStructureOrganization"
import { cookies } from "next/headers"
import { departmentApiServer } from "@/entities/Departments/api/departmentApiServer"

async function getUsers(departments: Awaited<ReturnType<typeof getDepartments>>, cookiesStore: string) {
	try {
		return await userApiServer.getUsersByDepartments(departments, cookiesStore)
	} catch {
		return []
	}
}

async function getDepartments(organizationId: number, childId: number, cookiesStore: string) {
	try {
		return await departmentApiServer.getChildrenOfDepartments(
			organizationId,
			childId,
			cookiesStore,
		)
	} catch {
		return []
	}
}

const StructureOrganization = async () => {
	const { organization } = await functionInitApplication()
	const cookiesStore = (await cookies()).toString()
	const departments = await getDepartments(organization.id, organization.child.id, cookiesStore)

	const users = await getUsers(departments, cookiesStore)

	return (
		<InitStructureOrganization users={users}>
			<Content className="structure-organization">
				<FullDepartmentTree />
				<FullUserList />
			</Content>
		</InitStructureOrganization>
	)
}

export default StructureOrganization
