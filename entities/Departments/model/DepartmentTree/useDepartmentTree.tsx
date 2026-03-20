import useOrganisationStore from "@/entities/Organisation/model/useOrganisationStore"
import useSWR from "swr"
import useDepartmentsStore from "../useDepartmentsStore"
import { departmentApi } from "../../api"
import { useEffect, useMemo } from "react"
import { useUserFiltersStore } from "@/entities/UserList"
import { APIError } from "@/shared/api/APIErrors"
import { IDepartment } from "../../lib"

const useDepartmentTree = () => {

    const organisationId = useOrganisationStore(state => state.organisation.id)
    const {data: departments, error} = useSWR<IDepartment[], APIError>(['organisation', organisationId], () => departmentApi.getDepartmentsByOrganisationId(organisationId))
    const setDepartments= useDepartmentsStore(state => state.setDepartments)

    useEffect(() => {
        if (departments !== undefined && !(departments instanceof APIError)) {
            setDepartments(departments)
        }
    }, [departments, setDepartments, error])

    const setFilterDepartmentIds = useUserFiltersStore(state => state.setDepartmentIds)
    const filterDepartmentIds = useUserFiltersStore(state => state.departmentIds)

    return useMemo(() => ({
        error,
        setFilterDepartmentIds,
        filterDepartmentIds,
    }), [setFilterDepartmentIds, filterDepartmentIds, error])
}
export default useDepartmentTree