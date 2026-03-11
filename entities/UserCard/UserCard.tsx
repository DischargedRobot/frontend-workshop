'use client'

import './UserCard.scss'

import Avatar from "@/shared/Avatar"
import RoleList from "../RoleList"
import { IUser } from "./types"
import AddButton from "@/shared/AddButton"

const UserCard = ({user}: {user: IUser}) => {

    return (
        <div className="user-card">
            <span className='user-card__avatar'>
                <Avatar />
            </span>
            <form className='user-card__personal-data'>
                <label>
                    <input type="text" placeholder="login" defaultValue={user.login}/>
                </label>
                <label>
                    <input type="text" placeholder="password" defaultValue={user.password}/>
                </label>
                <button type="submit">
                    Сохранить
                </button>
            </form>
            <div className='user-card__role-list'>
                <h2>Роли</h2>
                <RoleList/>
            </div>
        </div>
    )
}

export default UserCard