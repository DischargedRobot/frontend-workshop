import "./ffmenu.scss"

import FullDepartmentTable from "@/widgets/FullDepartmentTable/FullDepartmentTable"
import { Content } from "antd/es/layout/layout"
import { FullFeatureFlagsTable } from "@/widgets/FullFeatureFlagsTable"
import { functionInitApplication } from "../functionInitApplication"
import { InitFFMenu } from "./InitFFMenu"
import { departmentApiServer } from "@/entities/Departments/api/departmentApiServer"
import { cookies } from "next/headers"

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

async function getFFMenuData() {
	try {
		const { organization } = await functionInitApplication()
		const cookiesStore = (await cookies()).toString()

		console.log("getDepartmentsStart", organization.id, organization.child.id)

		return getDepartments(organization.id, organization.child.id, cookiesStore)

	} catch {
		return []
	}
}

const FFMenu = async () => {

	console.log("unrender FFMenu")

	const { organization } = await functionInitApplication()
	const departments = await getFFMenuData()

	console.log("render FFMenu", departments)

	return (
		<InitFFMenu
			departments={departments}
			organization={organization}
		>
			<Content className="ff-menu">
				<FullDepartmentTable />
				<FullFeatureFlagsTable />
			</Content>
		</InitFFMenu>
	)
}

export default FFMenu
