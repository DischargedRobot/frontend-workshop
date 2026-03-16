'use client'

import FFTable, { FeatureFlag, FeatureFlag } from "@/entities/FFTable/FFTable"
import AddFeatureFlag from "@/features/AddFeatureFlag/AddFeatureFlag"
import FFSearch from "@/features/FFSearch/FFSearch"
import ReloadFeaturesFlags from "@/features/ReloadFeatureFlags/ReloadFeaturesFlags"
import { Flex } from "antd"
import { useState } from "react"
import { useFFMenu } from "../../app/personal/ffmenu/useFFMenu"
import { Department } from "@/entities/Departments/lib/DepartmentType"
import { useShallow } from "zustand/shallow"
import useFilteredFFs from "@/entities/FFTable/model/useFilteredFFs"
import useFFFiltersStore from "@/entities/FFTable/model/useFFFiltersStore"



const FilteredByStringParam = <T, K extends keyof T>(regular: string, data: T[], field: K): T[] => {
    if (regular) {
        return data.filter(item => {
            if (typeof item[field] == 'string')
            {
                return item[field].includes(regular)
            }
            return false
        })
    }

    return data
}

// interface Props {
//     featureFlags: FeatureFlag[]
//     departments: Department[]
//     // setFeatureFlags: (departments: Department[]) => void
//     getFeatureFlagsByDepartments: (departments: Department[]) => Promise<FeatureFlag[]>
// }

const FullFeatureFlagsTable = () => {
    // const {
    //     departments,
    //     featureFlags, 
    //     getFeatureFlagsByDepartments,
    // } = props


    const {departments, getFeatureFlagsByDepartments} = 
        useFFMenu(useShallow(state => ({
            getFeatureFlagsByDepartments: state.getFeatureFlagsByDepartments, 
            departments: state.departments,
        })))

    const setFeatureFlags = async (departments: Department[]) => {
        const response = await getFeatureFlagsByDepartments(departments)

        setData(response.map(item => ({
            ...item,
            key: item.id,
        })))
    }

    const featureFlags = useFilteredFFs()
    const setFeatureFlagName = useFFFiltersStore(state => state.setName)
    // const featureFlags: FeatureFlag[] = createData(10)
    const [data, setData] = useState<FeatureFlag[]>(featureFlags.map(item => ({
            ...item,
            key: item.id,
        })))
    // console.log(data)
    return(
        <div>
            <Flex align="center" gap={30}>
                <FFSearch onSearch={(e) => {setFeatureFlagName(e.target.value)}}/>
                <AddFeatureFlag/>
                <ReloadFeaturesFlags onClick={() => setFeatureFlags(departments)}/>
            </Flex>
            <FFTable featureFlags={featureFlags}/>
        </div>
    )
}

export default FullFeatureFlagsTable