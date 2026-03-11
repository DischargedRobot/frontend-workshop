import { IUser } from "@/entities/UserCard/types"
import UserCard from "@/entities/UserCard/UserCard"

const StructureOrganisation = () => {

    return(
        <UserCard user={{login: 'dd', password: 'ss', id:1, roles: []} as IUser}/>
    )
}

export default StructureOrganisation