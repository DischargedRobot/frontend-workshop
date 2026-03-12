'use client'

import './UserList.scss'

import { IUser } from "@/entities/UserCard/types"
import UserCard from "@/entities/UserCard/UserCard"
import UserSearch from "@/features/UserSearch/UserSearch"
import AddButton from "@/shared/AddButton"

interface Props {
    users: IUser[]
}

const UserList = (props: Props) => {

    const {
        users,
    } = props

    return (
        <div className="user-list">

            <div className="user-list__title">
            <h2>Пользователи</h2>
                <UserSearch onSearch={() => console.log(users)}/>
                <AddButton/>
            </div>
            
            <ul className='user-list__list'>
                {users.map(user => (
                    <UserCard key={user.id} user={user}/>
                ))}
            </ul>
        </div>
        
    )
}

export default UserList