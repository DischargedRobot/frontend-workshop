'use client'

import FFTable, { FeatureFlag, FeatureFlagTable } from "@/entities/FFTable/FFTable"
import AddFeatureFlag from "@/features/AddFeatureFlag/AddFeatureFlag"
import FFSearch from "@/features/FFSearch/FFSearch"
import ReloadFeaturesFlags from "@/features/ReloadFeatureFlags/ReloadFeaturesFlags"
import { Flex } from "antd"
import { useState } from "react"
import { useFFMenu } from "../../app/ffmenu/useFFMenu"
import { Department } from "@/entities/DepartmentTable/DepartmentTableType"
import { useShallow } from "zustand/shallow"



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


    const {featureFlags, departments, getFeatureFlagsByDepartments} = 
        useFFMenu(useShallow(state => ({
            getFeatureFlagsByDepartments: state.getFeatureFlagsByDepartments, 
            featureFlags: state.featureFlags, 
            departments: state.departments,
        })))

    const setFeatureFlags = async (departments: Department[]) => {
        const response = await getFeatureFlagsByDepartments(departments)

        setData(response.map(item => ({
            ...item,
            key: item.id,
        })))
    }

    // const featureFlags: FeatureFlagTable[] = createData(10)
    const [data, setData] = useState<FeatureFlagTable[]>(featureFlags.map(item => ({
            ...item,
            key: item.id,
        })))
    // console.log(data)
    return(
        <div>
            <Flex align="center" gap={30}>
                <FFSearch onSearch={(e) => {setData(FilteredByStringParam(e.target.value, featureFlags.map(item => ({
                        ...item,
                        key: item.id,
                    })), 'name'))}}/>
                <AddFeatureFlag/>
                <ReloadFeaturesFlags onClick={() => setFeatureFlags(departments)}/>
            </Flex>
            <FFTable data={data}>

            </FFTable>
        </div>
    )
}

export default FullFeatureFlagsTable