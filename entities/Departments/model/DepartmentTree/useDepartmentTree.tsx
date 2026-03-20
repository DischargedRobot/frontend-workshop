import useOrganisationStore from "@/entities/Organisation/model/useOrganisationStore"
import useSWR from "swr"
import useDepartmentsStore from "../useDepartmentsStore"
import { departmentApi } from "../../api"
import { useEffect, useMemo } from "react"
import { useUserFiltersStore } from "@/entities/UserList"
import { APIError } from "@/shared/api/APIErrors"
import { IDepartment } from "../../lib"

const useDepartmentTree = () => {

    const organisation = useOrganisationStore(state => state.organisation)
    // TODO: жду когда допилят аутс сервис
    // const {data: orgChild, error} = useSWR<IDepartment[], APIError>(['organisation', organisation], () => departmentApi.getDepartmentsByOrganisation(organisation))
    const setDepartments= useDepartmentsStore(state => state.setDepartments)

    const {data: departments, error} = useSWR<IDepartment[], APIError>(
        [['organisationId, departmentId'], [organisation.id, organisation.children.id]], 
        () => departmentApi.getDescedantOfDepartments(organisation.id, organisation.children, 2)
    )
    console.log(departments, 'dddsds')

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