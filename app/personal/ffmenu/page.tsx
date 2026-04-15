import "./ffmenu.scss"

import FullDepartmentTable from "@/widgets/FullDepartmentTable/FullDepartmentTable"
import { Content } from "antd/es/layout/layout"
import { FullFeatureFlagsTable } from "@/widgets/FullFeatureFlagsTable"
import FFApi from "@/entities/FF/api/FFApi"
import { functionInitApplication } from "../functionInitApplication"
import { InitFFMenu } from "./InitFFMenu"
import { departmentApiServer } from "@/entities/Departments/api/departmentApiServer"
import { cookies } from "next/headers"

async function getFFMenuData() {
	try {
		const { organization } = await functionInitApplication()

		const cookiesStore = (await cookies()).toString()

		const departments = await departmentApiServer.getChildrenOfDepartments(
			organization.id,
			organization.child.id,
			cookiesStore,
		)

		const { FFs: featureFlags } = await FFApi.getFFsByDepartments(
			[organization.child.id, ...departments.map((d) => d.id)],
			organization.id,
			100,
			0,
		)

		return featureFlags
	} catch {
		return []
	}
}

const FFMenu = async () => {
	// const {featureFlags, setFeatureFlags,departments, getFeatureFlagsByDepartments} =
	//     useFFMenu(useShallow(state => ({
	//         getFeatureFlagsByDepartments: state.getFeatureFlagsByDepartments,
	//         featureFlags: state.featureFlags,
	//         departments: state.departments,
	//         setFeatureFlags: state.setFeatureFlags
	//     })))
	// TODO:: после хлебных крошек
	// const {
	//   getDepartmentsByPath: getDepartments
	// } = useDepartment()

	// const [departments, setDepartments] = useState([])

	// await FFApi.getFFsByDepartments()
	console.log("unrender FFMenu")

	const featureFlags = await getFFMenuData()

	console.log("render FFMenu")

	return (
		<InitFFMenu FFs={featureFlags}>
			<Content className="ff-menu">
				<FullDepartmentTable />
				<FullFeatureFlagsTable />
			</Content>
		</InitFFMenu>
	)
}

export default FFMenu
