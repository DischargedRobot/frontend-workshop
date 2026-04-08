"use client"

import "./FullUserList.scss"

import { useUserFiltersStore } from "@/entities/User"
import UserList from "@/entities/User/ui/UserList/UserList"
import { AddUser } from "@/features/AddUser"
import UserSearch from "@/features/UserSearch/ui/UserSearch"
import { Can } from "@/shared/model/Ability"

export const FullUserList = () => {
	const setLogin = useUserFiltersStore((state) => state.setLogin)

	return (
		<div className="full-user-list">
			<div className="full-user-list__title">
				{/* <h2>Пользователи</h2> */}
				<Can I="read" a="User">
					<UserSearch
						onSearch={(e) => {
							setLogin(e.target.value)
						}}
					/>
				</Can>
				<Can I="create" a="User">
					<AddUser />
				</Can>
			</div>

			<Can I="read" a="User">
				<UserList />
			</Can>
		</div>
	)
}
