import useFFFiltersStore from "./useFFFiltersStore"
import useSWR from "swr"
import { useFFStore } from "."
import { FFApi } from "../api"
// import { showToast } from "@/shared/ui/Toast/Toast"
import { APIError } from "@/shared/api/APIErrors"
import { useEffect, useMemo } from "react"
import { useShallow } from "zustand/shallow"
import { IFeatureFlag } from "../lib"
import { useOrganizationStore } from "@/entities/Organization"

const EMPTY_ARRAY: IFeatureFlag[] = []

const useGetFFsFromServer = () => {
	// console.log(filters, 'filters')
	const filterDepartmentIds = useFFFiltersStore(
		useShallow((state) => state.departmentIds),
	)
	const organizationId = useOrganizationStore(
		(state) => state.organization.id,
	)

	//TODO: может так и не надо, малоли, стоит ли так переделывать везде?
	const key = useMemo(() => {
		const sortedIds = [...filterDepartmentIds].sort().join(",")
		return [
			"organizationId",
			"departmentIds",
			"featureflags",
			organizationId,
			sortedIds,
		]
	}, [filterDepartmentIds, organizationId])
	// TODO: сделать set?
	const addFF = useFFStore((state) => state.addFeatureFlags)

	const {
		data: response,
		error,
		isLoading,
	} = useSWR<Awaited<ReturnType<typeof FFApi.getFFsByDepartments>>, APIError>(
		key,
		() =>
			FFApi.getFFsByDepartments(
				filterDepartmentIds,
				organizationId,
				50,
				0,
			),
		// {onSuccess: (data) => {
		//     console.log(data)
		//     addFF(data?.FFs ?? EMPTY_ARRAY);
		// }}
	)

	useEffect(() => {
		addFF(response?.FFs ?? EMPTY_ARRAY)
	}, [response?.FFs, addFF])
	// if (error) {
	//     return showToast({type: 'error', text: error.message, duration: 3000})
	// }
	// const FFs = response?.FFs ?? EMPTY_ARRAY
	return {
		error,
		isLoading,
	}
}

export default useGetFFsFromServer
