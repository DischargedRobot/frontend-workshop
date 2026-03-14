'use client'

import './FullUserList.scss'

import { IUser } from "@/entities/UserCard/types"
import UserCard from "@/entities/UserCard/UserCard"
import { useUsers } from '@/entities/UserList'
import useFilterOfUserList, { IUseFilterOfUserList } from '@/entities/UserList/model/useFilterOfUserList'
import UserList from '@/entities/UserList/ui/UserList'
import UserSearch from "@/features/UserSearch/UserSearch"
import AddButton from "@/shared/AddButton"

const FullUserList = () => {

    const users = useUsers(state => (state.users))
    const filteredUsers = useUsers(state => (state.filteredUsers))
    const setFilteredUsers = useUsers(state => (state.setFilteredUsers))

    const { filterByLogin: filterBylogin } = useFilterOfUserList()
    return (
        <div className="full-user-list">

            <div className="full-user-list__title">
            <h2>Пользователи</h2>
                <UserSearch onSearch={(e) => setFilteredUsers(filterBylogin(users, e.target.value))}/>
                <AddButton/>
            </div>
            
            <UserList users={filteredUsers}/>
        </div>
        
    )
}

export default FullUserList