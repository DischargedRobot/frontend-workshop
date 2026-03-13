'use client'

import './FullUserList.scss'

import { IUser } from "@/entities/UserCard/types"
import UserCard from "@/entities/UserCard/UserCard"
import UserList from '@/entities/UserList/ui/UserList'
import UserSearch from "@/features/UserSearch/UserSearch"
import AddButton from "@/shared/AddButton"

interface Props {
    users: IUser[]
}

const FullUserList = (props: Props) => {

    const {
        users,
    } = props

    return (
        <div className="full-user-list">

            <div className="full-user-list__title">
            <h2>Пользователи</h2>
                <UserSearch onSearch={() => console.log(users)}/>
                <AddButton/>
            </div>
            
            <UserList users={users}/>
        </div>
        
    )
}

export default FullUserList