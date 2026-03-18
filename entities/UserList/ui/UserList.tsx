'use client'

import './UserList.scss'

import UserCard from "@/entities/UserCard/ui/UserCard"
import { useFilteredUsers, useUsersStore } from '../model'

const UserList = () => {

    const users = useUsersStore(state => (state.users))
    const setUser = useUsersStore(state => (state.setUser))
    const filteredUsers = useFilteredUsers(users)

    return (
        <ul className='user-list '>
            {filteredUsers.map(user => (
                <UserCard 
                    key={user.id} 
                    user={user}
                    setUser={setUser}
                />
            ))}
        </ul>
    )
}

export default UserList