import { useCallback, useMemo } from "react"
import useUserFiltersStore from "./useUserFiltersStore"
import { useShallow } from "zustand/shallow"
import { IUser } from "../../lib/types"

type TFilterKey = "departmentIds" | "login"

export interface IFilteringFunctionArguments {
	departmentIds: number[]
	login: string
}

type TFilteringFunctions = {
	[Key in TFilterKey]: (
		users: IUser[],
		args: IFilteringFunctionArguments[Key],
	) => IUser[]
}

const filterByDepartmentIds = (users: IUser[], departmentsId: number[]) => {
	if (departmentsId.length == 0) {
		return users
	}

	return users.filter((user) => {
		if (user.department.id !== undefined) {
			return departmentsId.includes(user.department.id)
		}
		return false
	})
}

const filterByLogin = (users: IUser[], login: string) => {
	return users.filter((user) => user.login.includes(login))
}

const FilteringFunctions: TFilteringFunctions = {
	departmentIds: filterByDepartmentIds,
	login: filterByLogin,
}

const useFilteredUsers = (users: IUser[]) => {
	const filterArguments = useUserFiltersStore(
		useShallow((state) => ({
			departmentIds: state.departmentIds,
			login: state.login,
		})),
	)

	// TODO: возможно, её придётся убрать. Пока не нужна
	// const filterByDepartments = (users: IUser[], departments: IDepartment[]) => {
	//     const departmentsId = departments.map(department => (
	//         department.id
	//     ));

	//     const filteredUsers = users.filter((user) => (user.departmentId in departmentsId))

	//     return filteredUsers
	// }

	const filterUsers = useCallback(
		<T extends TFilterKey>(filters: T[], users: IUser[]): IUser[] => {
			return filters.reduce((filteredUsers, filter) => {
				// console.log(FilteringFunctions[filter](filteredUsers, filterArguments[filter]), filterArguments[filter], filter, 'args')
				return FilteringFunctions[filter](
					filteredUsers,
					filterArguments[filter],
				)
			}, users)
		},
		[filterArguments],
	)

	return useMemo(() => {
		const filteredUsers = filterUsers(["departmentIds", "login"], users)
		return filteredUsers
	}, [users, filterUsers])
}

export default useFilteredUsers
