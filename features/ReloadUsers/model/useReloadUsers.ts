import { mutate } from "swr"
import { userApiClient } from "@/entities/User"
import { useUsersStore } from "@/entities/User"
import { IDepartment } from "@/entities/Departments"
import { useAPIErrorHandler } from "@/shared/api/APIErrorHandler"

export const useReloadUsers = () => {
	const setUsers = useUsersStore((s) => s.setUsers)
	const handleError = useAPIErrorHandler()

	const reloadUsers = async (departments: IDepartment[]) => {
		try {
			const key = [["users", "departmentIds"], ["all", departments.map((d) => d.id)]].toString()
			const users = await mutate(key, userApiClient.getUsersByDepartments(departments))
			setUsers(users ?? [])
		} catch (error) {
			handleError(error as Error)
		}
	}

	return { reloadUsers }
}
