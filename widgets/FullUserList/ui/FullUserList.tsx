"use client"

import "./FullUserList.scss"

import UserList from "@/entities/User/ui/UserList/UserList"
import { AddUser } from "@/features/AddUser"
import { ReloadUsers } from "@/features/ReloadUsers"
import UserSearch from "@/features/UserSearch/ui/UserSearch"
import { useSelectedDepartmentsStore } from "@/entities/Departments"
import { Can } from "@/shared/model/Ability"
import { useFullUserList } from "../model"

export const FullUserList = () => {
	const { users, setUser, setLogin } = useFullUserList()
	const departments = useSelectedDepartmentsStore((s) => s.departments)

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
				<Can I="read" a="User">
					<ReloadUsers departments={departments} />
				</Can>
			</div>
			<Can I="read" a="User">
				<UserList users={users} setUser={setUser} />
			</Can>
		</div>
	)
}
