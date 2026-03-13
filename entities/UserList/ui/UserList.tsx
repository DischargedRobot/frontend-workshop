'use client'

import './UserList.scss'

import { IUser } from "@/entities/UserCard/types"
import UserCard from "@/entities/UserCard/UserCard"

interface Props {
    users: IUser[]
}

const UserList = (props: Props) => {

    const {
        users,
    } = props

    return (
        <ul className='user-list'>
            {users.map(user => (
                <UserCard key={user.id} user={user}/>
            ))}
        </ul>
    )
}

export default UserList