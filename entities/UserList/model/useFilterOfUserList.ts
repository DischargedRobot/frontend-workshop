import { IUser } from "@/entities/UserCard/types"
import { useCallback } from "react"

export interface IUseFilterOfUserList {
    filterByLogin: (users: IUser[], login: string) => IUser[]
}

type TFilterKey = 'departmentsId' | 'login'

interface IFilteringFunctionArguments {
    'departmentsId': number[],
    'login': string,
}

type TFilteringFunctions = {
    [Key in TFilterKey]: (users: IUser[], args: IFilteringFunctionArguments[Key]) => IUser[]
}

const useFilterOfUserList = () => {

    // TODO: возможно, её придётся убрать. Пока не нужна
    // const filterByDepartments = (users: IUser[], departments: IDepartment[]) => {
    //     const departmentsId = departments.map(department => (
    //         department.id
    //     ));

    //     const filteredUsers = users.filter((user) => (user.departmentId in departmentsId))
        
    //     return filteredUsers
    // }

    const filterByDepartmentIds = (users: IUser[], departmentsId: number[]) => {
        return users.filter((user) => (departmentsId.includes(user.departmentId)))
    }

    const filterByLogin = (users: IUser[], login: string) => {
        return users.filter((user) => (user.login.includes(login)))
    }

    const FilteringFunction: TFilteringFunctions = {
        departmentsId: filterByDepartmentIds,
        login: filterByLogin,
    }
    
    const filterUsers = <T extends TFilterKey>(filters: T[], users: IUser[], filteringFunctionArguments: IFilteringFunctionArguments): IUser[] => {
        return filters.reduce((filteredUsers, filter) => {
            return FilteringFunction[filter](filteredUsers, filteringFunctionArguments[filter])
        }, users)
    }

    return {
        filterUsers,
    }
}

export default useFilterOfUserList