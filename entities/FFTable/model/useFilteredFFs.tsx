import { useMemo } from "react"
import useFFStore from "./useFFStrore"
import useFFFiltersStore from "./useFFFiltersStore"
import { IFeatureFlag } from "../ui/FFTable"
import { useShallow } from "zustand/shallow"

type TFilterKey = 'departmentIds' | 'name'

interface IFilterFunctionsArguments {
    departmentIds: number[],
    name: string
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

    const featureFlags = useFFStore(state => state.featureFlags)

    const filters = useFFFiltersStore(useShallow(state => ({name: state.name, departmentIds: state.departmentIds})))

    return useMemo(() => 
        filterFF(['departmentIds', 'name'],featureFlags, filters)
    , [featureFlags, filters])
}

export default useFilteredFFs