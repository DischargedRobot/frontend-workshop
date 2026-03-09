'use client'

import FFTable, { FeatureFlagTable } from "@/entities/FFTable/FFTable"
import AddFeatureFlag from "@/features/AddFeatureFlag/AddFeatureFlag"
import FFSearch from "@/features/FFSearch/FFSearch"
import ReloadFeaturesFlags from "@/features/ReloadFeatureFlags/ReloadFeaturesFlags"
import { Flex } from "antd"
import { useState } from "react"


const createData = (number: number) : FeatureFlagTable[] => {
    return Array.from(({length: number}), (_, index) => ({
        key: index,
        name: `FF${index}`,
        departmentName: `Depart${index}`,
        isEnabled: false ,
        description: 'd'.repeat(index),
        lastModified: '11.11.2022'
    }))
}

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

const FullFeatureFlagsTable = () => {

    const featureFlags: FeatureFlagTable[] = createData(10)
    const [data, setData] = useState<FeatureFlagTable[]>(featureFlags)
    // console.log(data)
    return(
        <div>
            <Flex align="center" gap={30}>
                <FFSearch onSearch={(e) => {setData(FilteredByStringParam(e.target.value, featureFlags, 'name'))}}/>
                <AddFeatureFlag/>
                <ReloadFeaturesFlags/>
            </Flex>
            <FFTable data={data}>

            </FFTable>
        </div>
    )
}

export default FullFeatureFlagsTable