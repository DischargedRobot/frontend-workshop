import { IUser } from "@/entities/UserCard/types"
import UserCard from "@/entities/UserCard/UserCard"

interface Props {
    users: IUser[]
}

const UserList = (props: Props) => {

    const {
        users,
    } = props

    return (
        <div>
            {/* <h2>Users</h2> */}
            <ul>
                {users.map(user => (
                    <UserCard key={user.id} user={user}/>
                ))}
            </ul>
        </div>
        
    )
}

export default UserList