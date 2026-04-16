"use client"

import "./UserList.scss"

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
				<li key={user.id} className="user-list__item">
					<UserCard user={user} setUser={setUser} />
				</li>
			))}
		</ul>
	)
}

export default UserList
