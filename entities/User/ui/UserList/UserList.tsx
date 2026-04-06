"use client"

import "./UserList.scss"

import { useFilteredUsers } from "../../model/UserList"
import useUsersStore from "../../model/useUsersStore"
import { UserCard } from "../UserCard"

const UserList = () => {
	const users = useUsersStore((state) => state.users)
	const setUser = useUsersStore((state) => state.setUser)
	const filteredUsers = useFilteredUsers(users)

	return (
		<ul className="user-list ">
			{filteredUsers.map((user) => (
				<UserCard key={user.id} user={user} setUser={setUser} />
			))}
		</ul>
	)
}

export default UserList
