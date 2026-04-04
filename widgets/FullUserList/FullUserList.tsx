"use client"

import "./FullUserList.scss"

import { useUserFiltersStore } from "@/entities/User/UserList"
import UserList from "@/entities/User/UserList/ui/UserList"
import { FFTableFilters } from "@/features/FFTableFilters"
import UserSearch from "@/features/UserSearch/ui/UserSearch"
import AddButton from "@/shared/AddButton"
import Toast from "@/shared/ui/Toast/Toast"

const FullUserList = () => {
	const setLogin = useUserFiltersStore((state) => state.setLogin)

	return (
		<div className="full-user-list">
			<div className="full-user-list__title">
				{/* <h2>Пользователи</h2> */}
				<UserSearch
					onSearch={(e) => {
						setLogin(e.target.value)
					}}
				/>
				<AddButton />
			</div>

			<UserList />
		</div>
	)
}

export default FullUserList
