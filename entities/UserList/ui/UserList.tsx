'use client'

import './UserList.scss'

import { IUser } from "@/entities/UserCard/types"
import UserCard from "@/entities/UserCard/UserCard"
import { useFilteredUsers, useUsers } from '../model'

const UserList = () => {

    const users = useUsers(state => (state.users))

    const filteredUsers = useFilteredUsers(users)

    return (
        <ul className='user-list'>
            {filteredUsers.map(user => (
                <UserCard key={user.id} user={user}/>
            ))}
        </ul>
    )
}

export default UserList