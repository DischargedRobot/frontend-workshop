'use client'

import './FullUserList.scss'

import { useUsers } from '@/entities/UserList'
import useFilteredUsers from '@/entities/UserList/model/useFilteredUsers'
import useUserFiltersStore from '@/entities/UserList/model/useUserFiltersStore'
import UserList from '@/entities/UserList/ui/UserList'
import UserSearch from "@/features/UserSearch/UserSearch"
import AddButton from "@/shared/AddButton"
import { useMemo } from 'react'

const FullUserList = () => {

    const setLogin = useUserFiltersStore(state => state.setLogin)

    return (
        <div className="full-user-list">

            <div className="full-user-list__title">
            <h2>Пользователи</h2>
                <UserSearch onSearch={(e) => {
                    setLogin(e.target.value)
                    }}
                />
                <AddButton/>
            </div>
            
            <UserList/>
        </div>
        
    )
}

export default FullUserList