import { useMemo } from "react"
import useFFStore from "./useFFStrore"
import useFFFiltersStore from "./useFFFiltersStore"
import { FeatureFlag } from "../ui/FFTable"
import { useShallow } from "zustand/shallow"

type TFilterKey = 'departmentIds' | 'name'

interface IFilterFunctionsArguments {
    departmentIds: number[],
    name: string
}
const filterByDepartmentIds = (featureFlags: FeatureFlag[], departmentIds: number[]): FeatureFlag[] => {
    if (departmentIds.length === 0) {
        return featureFlags
    }
    return featureFlags.filter((featureFlag) => (departmentIds.includes(featureFlag.departmentId)))
}

const filterByName = (featureFlags: FeatureFlag[], name: string): FeatureFlag[] => {
    return featureFlags.filter((featureFlag) => featureFlag.name.includes(name))
}

type TFilterFunction = {
    [K in TFilterKey]: (featureFlags: FeatureFlag[], ars: IFilterFunctionsArguments[K]) => FeatureFlag[]
}

const filterFunction: TFilterFunction = {
    departmentIds: filterByDepartmentIds,
    name: filterByName,
}

type filterFF = <T extends TFilterKey>(filters: T[], featureFlags: FeatureFlag[], filterArguments: IFilterFunctionsArguments) => FeatureFlag[]

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