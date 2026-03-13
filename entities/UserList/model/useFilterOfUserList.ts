import { IDepartment } from "@/entities/DepartmentTable"
import { IUser } from "@/entities/UserCard/types"

const useFilterOfUserList = () => {
    
    const filterByDepartment = (users: IUser[], departments: IDepartment[]) => {
        const departmentsId = departments.map(department => (
            department.id
        ));

        const filteredUsers = users.filter((user) => (user.departmentId in departmentsId))
        
        return filteredUsers
    }

    const filterByDepartmentsId = (users: IUser[], departmentsId: number[]) => {

        const filteredUsers = users.filter((user) => (departmentsId.includes(user.departmentId)))
        
        return filteredUsers
    }

    const filterByLogin = (users: IUser[], login: string) => {

        const filteredUsers = users.filter((user) => (user.login.includes(login)))
        
        return filteredUsers
    }

    return {
        filterByLogin,
        filterByDepartmentsId,
        filterByDepartment,
    }
}

export default useFilterOfUserList