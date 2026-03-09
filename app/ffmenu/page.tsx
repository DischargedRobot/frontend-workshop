import NavigationMenu from "@/entities/NavigationMenu/NavigationMenu"
import FullDepartmentTable from "@/widgets/FullDepartmentTable/FullDepartmentTable";
import FFTable from "@/entities/FFTable/FFTable";
import { Content } from "antd/es/layout/layout";

import './ffmenu.scss'
import FullFeatureFlagsTable from "@/widgets/FullFeatureFlagsTable/FullFeatureFlagsTable";
const FFMenu = () => {

    // TODO:: после хлебных крошек
    // const {
    //   getDepartmentsByPath: getDepartments
    // } = useDepartment()

    // const [departments, setDepartments] = useState([])

    return (
        <>
            <NavigationMenu/>
            <Content className="ff-menu">
                <FullDepartmentTable/>
                <FullFeatureFlagsTable/>
            </Content>
        </>
        
    )
}

export default FFMenu