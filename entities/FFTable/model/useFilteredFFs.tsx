import { useMemo } from "react"
import useFFStore from "./useFFStrore"
import useFFFiltersStore from "./useFFFiltersStore"
import { IFeatureFlag } from "../ui/FFTable"
import { useShallow } from "zustand/shallow"
import useOrganisationStore from "@/entities/Organisation/model/useOrganisationStore"
import useSWR from "swr"
import { FFApi } from "../api"
import { set } from "react-hook-form"

// TODO: в lib
type TFilterKey = 'departmentIds' | 'name'

interface IFilterFunctionsArguments {
    departmentIds: number[],
    name: string,
}
const filterByDepartmentIds = (featureFlags: IFeatureFlag[], departmentIds: number[]): IFeatureFlag[] => {
    if (departmentIds.length === 0) {
        return featureFlags
    }
    return featureFlags.filter((featureFlag) => (departmentIds.includes(featureFlag.departmentId)))
}

const filterByName = (featureFlags: IFeatureFlag[], name: string): IFeatureFlag[] => {
    return featureFlags.filter((featureFlag) => featureFlag.name.includes(name))
}

type TFilterFunction = {
    [K in TFilterKey]: (featureFlags: IFeatureFlag[], ars: IFilterFunctionsArguments[K]) => IFeatureFlag[]
}

const filterFunction: TFilterFunction = {
    departmentIds: filterByDepartmentIds,
    name: filterByName,
}

type filterFF = <T extends TFilterKey>(filters: T[], featureFlags: IFeatureFlag[], filterArguments: IFilterFunctionsArguments) => IFeatureFlag[]

const filterFF: filterFF = (filters, featureFlags, filterArguments) => {
    return filters.reduce((filteredFeatureFlags, filter) => {
        return filterFunction[filter](filteredFeatureFlags, filterArguments[filter])
    }, featureFlags)
}

const useFilteredFFs = () => {
    // console.log(featureFlags, 'filtered')
    const filters = useFFFiltersStore(useShallow(state => ({
        name: state.name, 
        departmentIds: state.departmentIds
    })))
    
    const featureFlags = useFFStore(state => state.featureFlags)

    console.log(featureFlags)

    return useMemo(() => 
        filterFF(['departmentIds', 'name'], featureFlags, filters)
    , [featureFlags, filters])
}

export default useFilteredFFs