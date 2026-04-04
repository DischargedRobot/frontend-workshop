import useOrganisationStore from "@/entities/Organisation/model/useOrganisationStore"
import useSWR from "swr"
import useDepartmentsStore from "../useDepartmentsStore"
import { departmentApi } from "../../api"
import { useEffect, useMemo } from "react"
import { useUserFiltersStore } from "@/entities/UserList"
import { APIError } from "@/shared/api/APIErrors"
import { IDepartment } from "../../lib"

const useDepartmentTree = () => {
	const setFilterDepartmentIds = useUserFiltersStore(
		(state) => state.setDepartmentIds,
	)
	const filterDepartmentIds = useUserFiltersStore(
		(state) => state.departmentIds,
	)

	const organisation = useOrganisationStore((state) => state.organisation)
	// const setOrganisation = useOrganisationStore(state => state.setOrganisation)
	const changeChild = useOrganisationStore((state) => state.changeChildren)

	// TODO: жду когда допилят аутс сервис
	// const {data: orgChild, error} = useSWR<IDepartment[], APIError>(['organisation', organisation], () => departmentApi.getDepartmentsByOrganisation(organisation))
	const setDepartments = useDepartmentsStore((state) => state.setDepartments)

	const { data: departments, error } = useSWR<IDepartment[], APIError>(
		[
			["organisationId, departmentId"],
			[organisation.id, organisation.children.id],
		],
		() =>
			departmentApi.getDescedantOfDepartments(
				organisation.id,
				organisation.children.id,
				2,
			),
	)

	useEffect(() => {
		if (departments !== undefined) {
			changeChild(departments)
		}
	}, [departments, changeChild])

	useEffect(() => {
		if (
			organisation.children !== undefined &&
			!(organisation.children instanceof APIError)
		) {
			setDepartments([organisation.children])
		}
	}, [organisation, setDepartments, error])

	return useMemo(
		() => ({
			error,
			setFilterDepartmentIds,
			filterDepartmentIds,
		}),
		[setFilterDepartmentIds, filterDepartmentIds, error],
	)
}
export default useDepartmentTree
