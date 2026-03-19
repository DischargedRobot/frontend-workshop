import useOrganisationStore from "@/entities/Organisation/model/useOrganisationStore"
import useSWR from "swr"
import useDepartmentsStore from "../useDepartmentsStore"
import { departmentApi } from "../../api"
import { useEffect, useMemo } from "react"
import { useUserFiltersStore } from "@/entities/UserList"

const useDepartmentTree = () => {

    const organisationId = useOrganisationStore(state => state.organisation.id)
    const {data: departments} = useSWR(['organisation', organisationId], () => departmentApi.getDepartmentsByOrganisationId(organisationId))
    const setDepartments= useDepartmentsStore(state => state.setDepartments)

    useEffect(() => {
        if (departments !== undefined) {
            setDepartments(departments)
        }
    }, [departments, setDepartments])

    const setFilterDepartmentIds = useUserFiltersStore(state => state.setDepartmentIds)
    const filterDepartmentIds = useUserFiltersStore(state => state.departmentIds)

    return useMemo(() => ({
        setFilterDepartmentIds,
        filterDepartmentIds,
    }), [setFilterDepartmentIds, filterDepartmentIds])
}
export default useDepartmentTree