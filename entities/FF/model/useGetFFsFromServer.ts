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
	const filterDepartments = useFFFiltersStore(
		useShallow((state) => state.departments),
	)

	const organizationId = useOrganizationStore(
		(state) => state.organization.id,
	)

	//TODO: может так и не надо, малоли, стоит ли так переделывать везде?
	const key = useMemo(() => {
		const sortedIds = filterDepartments
			.map((dep) => dep.id)
			.sort()
			.join(",")

		return [
			"organizationId",
			"departmentIds",
			"featureflags",
			organizationId,
			sortedIds,
		].toString()
	}, [filterDepartments, organizationId])

	console.log("filterDepartments in useGetFFsFromServer", filterDepartments)
	const addFF = useFFStore((state) => state.addFeatureFlags)

	const { data, error, isLoading } = useSWR<
		Awaited<ReturnType<typeof FFApi.getFFsByDepartments>>,
		APIError
	>(key, () =>
		FFApi.getFFsByDepartments(filterDepartments, organizationId, 50, 0),
	)

	// TODO: сделать set?

	useEffect(() => {
		addFF(data?.FFs ?? EMPTY_ARRAY)
	}, [data?.FFs, addFF])
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
