'use client'

import FFTable from "@/entities/FFTable/ui/FFTable"
import AddFeatureFlag from "@/features/AddFeatureFlag/AddFeatureFlag"
import FFSearch from "@/features/FFSearch/FFSearch"
import ReloadFeaturesFlags from "@/features/ReloadFeatureFlags/ReloadFeaturesFlags"
import { Flex } from "antd"
import { IDepartment } from "@/entities/Departments/lib/DepartmentType"
import useFilteredFFs from "@/entities/FFTable/model/useFilteredFFs"
import useFFFiltersStore from "@/entities/FFTable/model/useFFFiltersStore"
import useDepartmentsStore from "@/entities/Departments/model/useDepartmentsStore"
import useFFStore from "@/entities/FFTable/model/useFFStrore"
import {FFApi} from "@/entities/FFTable"
import { FFTableFilters } from "@/features/FFTableFilters"



// const FilteredByStringParam = <T, K extends keyof T>(regular: string, data: T[], field: K): T[] => {
//     if (regular) {
//         return data.filter(item => {
//             if (typeof item[field] == 'string')
//             {
//                 return item[field].includes(regular)
//             }
//             return false
//         })
//     }

//     return data
// }

// interface Props {
//     featureFlags: IFeatureFlag[]
//     departments: Department[]
//     // setFeatureFlags: (departments: Department[]) => void
//     getFeatureFlagsByDepartments: (departments: Department[]) => Promise<IFeatureFlag[]>
// }

const FullFeatureFlagsTable = () => {
    // const {
    //     departments,
    //     featureFlags, 
    //     getFeatureFlagsByDepartments,
    // } = props


    const getFeatureFlagsByDepartments = FFApi.getFeatureFlagsByDepartments

    const departments = useDepartmentsStore(state => state.departments)
    const setFeatureFlag = useFFStore(state => state.setFeatureFlags)

    const setFeatureFlags = async (departments: IDepartment[]) => {
        const response = await getFeatureFlagsByDepartments(departments)
        setFeatureFlag(response)
        // setData(response.map(item => ({
        //     ...item,
        //     key: item.id,
        // })))
    }

    const setFeatureFlagName = useFFFiltersStore(state => state.setName)
    // const featureFlags: IFeatureFlag[] = createData(10)
    // const [data, setData] = useState<IFeatureFlag[]>(featureFlags.map(item => ({
    //         ...item,
    //         key: item.id,
    //     })))
    // console.log(data)
    return(
        <div>
            <Flex align="center" gap={30}>
                <FFTableFilters/>
                <FFSearch onSearch={(e) => {setFeatureFlagName(e.target.value)}}/>
                <AddFeatureFlag/>
                <ReloadFeaturesFlags onClick={() => setFeatureFlags(departments)}/>
            </Flex>
            <FFTable/>
        </div>
    )
}

export default FullFeatureFlagsTable