import NavigationMenu from "@/entities/NavigationMenu/ui/NavigationMenu"
import FullDepartmentTable from "@/widgets/FullDepartmentTable/FullDepartmentTable";
import { Content } from "antd/es/layout/layout";

import './ffmenu.scss'
import FullFeatureFlagsTable from "@/widgets/FullFeatureFlagsTable/FullFeatureFlagsTable";
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
        <>
            <Content className="ff-menu">
                <FullDepartmentTable/>
                <FullFeatureFlagsTable/>
            </Content>
        </>
        
    )
}

export default FFMenu