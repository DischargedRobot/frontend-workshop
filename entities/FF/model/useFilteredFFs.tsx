import { useMemo } from "react"
import useFFStore from "./useFFStrore"
import useFFFiltersStore from "./useFFFiltersStore"
import { useShallow } from "zustand/shallow"
import { IFeatureFlag } from "../lib"

// TODO: в lib
type TFilterKey = "departmentIds" | "name"

interface IFilterFunctionsArguments {
	departmentIds: number[]
	name: string
}
const filterByDepartmentIds = (
	featureFlags: IFeatureFlag[],
	departmentIds: number[],
): IFeatureFlag[] => {
	if (departmentIds.length === 0) {
		return featureFlags
	}
	return featureFlags.filter((featureFlag) =>
		departmentIds.includes(featureFlag.departmentId),
	)
}

const filterByName = (
	featureFlags: IFeatureFlag[],
	name: string,
): IFeatureFlag[] => {
	return featureFlags.filter((featureFlag) => featureFlag.name.includes(name))
}

type TFilterFunction = {
	[K in TFilterKey]: (
		featureFlags: IFeatureFlag[],
		ars: IFilterFunctionsArguments[K],
	) => IFeatureFlag[]
}

const filterFunction: TFilterFunction = {
	departmentIds: filterByDepartmentIds,
	name: filterByName,
}

type TTilterFF = <T extends TFilterKey>(
	filters: T[],
	featureFlags: IFeatureFlag[],
	filterArguments: IFilterFunctionsArguments,
) => IFeatureFlag[]

const filterFF: TTilterFF = (filters, featureFlags, filterArguments) => {
	return filters.reduce((filteredFeatureFlags, filter) => {
		return filterFunction[filter](
			filteredFeatureFlags,
			filterArguments[filter],
		)
	}, featureFlags)
}

const useFilteredFFs = () => {
	const name = useFFFiltersStore((state) => state.name)
	const departments = useFFFiltersStore(useShallow((state) => state.departments))

	const filters: IFilterFunctionsArguments = useMemo(
		() => ({
			name,
			departmentIds: departments.map((dep) => dep.id),
		}),
		[name, departments],
	)

	const featureFlags = useFFStore((state) => state.featureFlags)

	return useMemo(
		() => filterFF(["departmentIds", "name"], featureFlags, filters),
		[featureFlags, filters],
	)
}

export default useFilteredFFs
