import Avatar from "@/shared/Avatar/Avatar"
import RoleList from "../RoleList/RoleList"
import { IUser } from "./types"
import { use } from "react"

const UserCard = ({user}: {user: IUser}) => {

    return (
        <form>
            <div>
                <Avatar/>
                <div>
                    <label>
                        <input type="text" placeholder="login" defaultValue={user.login}/>
                    </label>
                    <label>
                        <input type="text" placeholder="password" defaultValue={user.password}/>
                    </label>
                </div>
            </div>
            <RoleList/>
            <input type="submit"/>
        </form>
    )
}

export default UserCard