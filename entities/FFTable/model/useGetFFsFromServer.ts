import useOrganisationStore from "@/entities/Organisation/model/useOrganisationStore"
import useFFFiltersStore from "./useFFFiltersStore"
import useSWR from "swr"
import { useFFStore } from "."
import { FFApi } from "../api"
// import { showToast } from "@/shared/ui/Toast/Toast"
import { APIError } from "@/shared/api/APIErrors"
import { useEffect, useMemo } from "react"
import { IFeatureFlag } from "../ui/FFTable"
import { useShallow } from "zustand/shallow"
const EMPTY_ARRAY: IFeatureFlag[] = []
const useGetFFsFromServer = () => {
        // console.log(filters, 'filters')
    const filterDepartmentIds = useFFFiltersStore(useShallow(state => state.departmentIds))
    const organisationId = useOrganisationStore(state => state.organisation.id)

    //TODO: может так и не надо, малоли, стоит ли так переделывать везде?
    const key = useMemo(() => {
        const sortedIds = [...filterDepartmentIds].sort().join(',')
        return ['organisationId', 'departmentIds', 'featureflags', organisationId, sortedIds]
        
    }, [filterDepartmentIds, organisationId])
    const setFF = useFFStore(state => state.setFeatureFlags)

    const {data: response, error, isLoading} = useSWR<Awaited<ReturnType<typeof FFApi.getFFsByDepartments>>, APIError>(
        key,
        () => FFApi.getFFsByDepartments(filterDepartmentIds, organisationId, 50, 0),
        {onSuccess: (data) => {
            setFF(data?.FFs ?? EMPTY_ARRAY);
        }}
    )

    // if (error) {
    //     return showToast({type: 'error', text: error.message, duration: 3000})
    // }
    const FFs = response?.FFs ?? EMPTY_ARRAY
    return {
        FFs,
        error,
        isLoading,
    }
}

export default useGetFFsFromServer