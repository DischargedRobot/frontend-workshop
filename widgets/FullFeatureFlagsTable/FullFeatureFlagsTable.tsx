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
import useOrganisationStore from "@/entities/Organisation/model/useOrganisationStore"
import { useShallow } from "zustand/shallow"
import AddButton from "@/shared/AddButton"



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
    const getFeatureFlagsByDepartments = FFApi.getFeatureFlagsByDepartments

    const departmentIds = useDepartmentsStore(useShallow(state => state.departments.map(department => department.id)))
    const setFeatureFlag = useFFStore(state => state.setFeatureFlags)

    const organisationId = useOrganisationStore(state => state.organisation.id)
    const setFeatureFlags = async (departments: number[]) => {
        const response = await getFeatureFlagsByDepartments(departments, organisationId)
        console.log(response)
        setFeatureFlag(response)
    }

    const setFeatureFlagName = useFFFiltersStore(state => state.setName)
    return(
        <div style={{display: "flex", flexDirection: 'column', gap: '20px'}}>
            <Flex align="center" gap={30}>
                <FFTableFilters/>
                <FFSearch onSearch={(e) => {setFeatureFlagName(e.target.value)}}/>
                <AddButton/>
                <ReloadFeaturesFlags onClick={() => setFeatureFlags(departmentIds)}/>
            </Flex>
            <FFTable/>
        </div>
    )
}

export default FullFeatureFlagsTable