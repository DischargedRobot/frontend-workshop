"use client"

import "./UserList.scss"

import { useFilteredUsers } from "../../model/UserList"
import useUsersStore from "../../model/useUsersStore"
import { UserCard } from "../UserCard"
import { IUser } from "../../lib"

interface Props {
	users: IUser[]
	setUser: (user: IUser) => void
}

const UserList = ({ users, setUser }: Props) => {

	return (
		<ul className="user-list ">
			{users.map((user) => (
				<UserCard key={user.id} user={user} setUser={setUser} />
			))}
		</ul>
	)
}

export default UserList
