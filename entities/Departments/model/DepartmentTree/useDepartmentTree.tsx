import { useOrganisationStore } from "@/entities/Organisation"
import useSWR from "swr"
import { useDepartmentsStore } from "../useDepartmentsStore"
import { departmentApi } from "../../api"
import { useEffect, useMemo } from "react"
import { APIError } from "@/shared/api/APIErrors"
import { IDepartment } from "../../lib"
import { useUserFiltersStore } from "@/entities/User"

const useDepartmentTree = () => {
	const setFilterDepartmentIds = useUserFiltersStore(
		(state) => state.setDepartmentIds,
	)
	const filterDepartmentIds = useUserFiltersStore(
		(state) => state.departmentIds,
	)

	const organisation = useOrganisationStore((state) => state.organisation)
	// const setOrganisation = useOrganisationStore(state => state.setOrganisation)
	const changeChild = useOrganisationStore((state) => state.changeChild)

	// TODO: жду когда допилят аутс сервис
	// const {data: orgChild, error} = useSWR<IDepartment[], APIError>(['organisation', organisation], () => departmentApi.getDepartmentsByOrganisation(organisation))
	const setDepartments = useDepartmentsStore((state) => state.setDepartments)

	const { data: departments, error } = useSWR<IDepartment[], APIError>(
		[
			["organisationId, departmentId"],
			[organisation.id, organisation.child.id],
		],
		() =>
			departmentApi.getDescedantOfDepartments(
				organisation.id,
				organisation.child.id,
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
			organisation.child !== undefined &&
			!(organisation.child instanceof APIError)
		) {
			setDepartments([organisation.child])
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
