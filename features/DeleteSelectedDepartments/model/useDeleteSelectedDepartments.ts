import {
	departmentApi,
	useDepartmentsStore,
	useSelectedDepartmentsStore,
} from "@/entities/Departments"
import { useOrganisationStore } from "@/entities/Organisation"
import { useUsersStore } from "@/entities/User"
import { useAPIErrorHandler } from "@/shared/api/APIErrorHandler"

export const useDeleteSelectedDepartments = () => {
	const organisationId = useOrganisationStore(
		(state) => state.organisation.id,
	)
	const selectedDepartments = useSelectedDepartmentsStore(
		(state) => state.departments,
	)

	const removeSelectedDepartments = useSelectedDepartmentsStore(
		(state) => state.removeDepartments,
	)
	const removeDepartmentsFromStore = useDepartmentsStore(
		(state) => state.removeDepartments,
	)
	const users = useUsersStore((state) => state.users)
	const setUsers = useUsersStore((state) => state.setUsers)

	const handleError = useAPIErrorHandler()
	const deleteDepartments = () => {
		try {
			const selectedIds = selectedDepartments.map((dep) => dep.id)
			// на сервере
			departmentApi.removeDepartmentsByIds(organisationId, selectedIds)

			// у себя - удаляем из обоих сторов
			removeDepartmentsFromStore(selectedDepartments)
			removeSelectedDepartments()
			setUsers(
				users.map((user) =>
					user.departmentId != undefined &&
					selectedIds.includes(user.departmentId)
						? { ...user, departmentId: undefined }
						: user,
				),
			)
		} catch (error) {
			handleError(error as Error)
		}
	}

	return { deleteDepartments }
}
