import './DeleteDepartment.scss'

import { departmentApi } from "@/entities/Departments"
import useDepartmentsStore from "@/entities/Departments/model/useDepartmentsStore"
import useOrganisationStore from "@/entities/Organisation/model/useOrganisationStore"
import { useUsersStore } from "@/entities/UserList"
import { DeleteIcon } from "@/shared/assets/Icon"

const DeleteDepartment = () => {


    const organisationId = useOrganisationStore(state => state.organisation.id)

    const selectedDepartmentIds = useDepartmentsStore(state => state.selectedDepartmentIds)
    const removeSelectedDepartment = useDepartmentsStore(state => state.removeSelectedDepartment)

    const users = useUsersStore(state => state.users)
    const setUsers = useUsersStore(state => state.setUsers)
    
    const deleteDepartmentsFromUsers = () => {
        setUsers(users.map((user) => {
            if (user.departmentId != undefined && selectedDepartmentIds.includes(user.departmentId)) {
                return {...user, departmentId: undefined}
            }
            return user
        }))
    }

    return (
        <button className='delete-department' onClick={() => {
                departmentApi.removeDepartmentsByIds(organisationId, selectedDepartmentIds)
                removeSelectedDepartment()
                deleteDepartmentsFromUsers()
            }}
        >
            <DeleteIcon/>
        </button>
    )
}

export default DeleteDepartment