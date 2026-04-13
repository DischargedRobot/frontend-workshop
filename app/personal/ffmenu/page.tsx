import "./ffmenu.scss"

import FullDepartmentTable from "@/widgets/FullDepartmentTable/FullDepartmentTable"
import { Content } from "antd/es/layout/layout"
import { FullFeatureFlagsTable } from "@/widgets/FullFeatureFlagsTable"
import { PageReadyWrapper } from "@/shared/ui/PageReadyWrapper"

const FFMenu = () => {
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

	return (
		// <PageReadyWrapper>
		<Content className="ff-menu">
			<FullDepartmentTable />
			<FullFeatureFlagsTable />
		</Content>
		// </PageReadyWrapper>
	)
}

export default FFMenu
