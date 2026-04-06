import { departmentApi, useDepartmentsStore } from "@/entities/Departments"
import { useOrganisationStore } from "@/entities/Organisation"
import { useUsersStore } from "@/entities/User"
import { APIError } from "@/shared/api"
import { useAPIErrorHandler } from "@/shared/api/APIErrorHandler"

export const useDeleteSelectedDepartments = () => {
	const organisationId = useOrganisationStore(
		(state) => state.organisation.id,
	)
	const selectedDepartmentIds = useDepartmentsStore(
		(state) => state.selectedDepartmentIds,
	)

	const removeSelectedDepartment = useDepartmentsStore(
		(state) => state.removeSelectedDepartment,
	)
	const users = useUsersStore((state) => state.users)
	const setUsers = useUsersStore((state) => state.setUsers)

	const handleError = useAPIErrorHandler()
	const deleteDepartments = () => {
		try {
			departmentApi.removeDepartmentsByIds(
				organisationId,
				selectedDepartmentIds,
			)
			removeSelectedDepartment()
			setUsers(
				users.map((user) =>
					user.departmentId != undefined &&
					selectedDepartmentIds.includes(user.departmentId)
						? { ...user, departmentId: undefined }
						: user,
				),
			)
			throw new APIError(500, "dsdfsdf")
		} catch (error) {
			handleError(error as Error)
		}
	}

	return { deleteDepartments }
}
