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

    return {
        filterByDepartment,
    }
}

export default useFilterOfUserList