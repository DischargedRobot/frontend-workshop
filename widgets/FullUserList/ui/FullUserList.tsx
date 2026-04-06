"use client"

import "./FullUserList.scss"

import { useUserFiltersStore } from "@/entities/User"
import UserList from "@/entities/User/ui/UserList/UserList"
import { RegistrationQrCode } from "@/features/RegistrationQrCode/ui/RegistrationQrCode"
import UserSearch from "@/features/UserSearch/ui/UserSearch"

export const FullUserList = () => {
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
				<RegistrationQrCode url="yandex.ru" />
			</div>

			<UserList />
		</div>
	)
}
