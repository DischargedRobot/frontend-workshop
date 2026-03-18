'use client'

import './FullUserList.scss'

import useUserFiltersStore from '@/entities/UserList/model/useUserFiltersStore'
import UserList from '@/entities/UserList/ui/UserList'
import UserSearch from "@/features/UserSearch/UserSearch"
import AddButton from "@/shared/AddButton"

const FullUserList = () => {

    const setLogin = useUserFiltersStore(state => state.setLogin)

    return (
        <div className="full-user-list">

            <div className="full-user-list__title">
            {/* <h2>Пользователи</h2> */}
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