import NavigationMenu from "@/entities/NavigationMenu/NavigationMenu"
import FullDepartmentTable from "@/widgets/FullDepartmentTable/FullDepartmentTable";
import FFTable from "@/entities/FFTable/FFTable";
import { Content } from "antd/es/layout/layout";

import './ffmenu.scss'
import FullFeatureFlagsTable from "@/widgets/FullFeatureFlagsTable/FullFeatureFlagsTable";
import { useFFMenu } from "./useFFMenu";
import { useShallow } from "zustand/shallow";
const FFMenu = () => {

    const {featureFlags, setFeatureFlags,departments, getFeatureFlagsByDepartments} = 
        useFFMenu(useShallow(state => ({
            getFeatureFlagsByDepartments: state.getFeatureFlagsByDepartments, 
            featureFlags: state.featureFlags, 
            departments: state.departments,
            setFeatureFlags: state.setFeatureFlags
        })))
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
                <FullFeatureFlagsTable 
                    departments={departments}
                    featureFlags={featureFlags.map(item => ({
                            ...item,
                            key: item.id,
                        }))} 
                    // setFeatureFlags={setFeatureFlags} 
                    getFeatureFlagsByDepartments={getFeatureFlagsByDepartments}
                />
            </Content>
        </>
        
    )
}

export default FFMenu