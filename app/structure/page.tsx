import { IUser } from "@/entities/UserCard/types"
import { IRole, TROLE } from "@/shared/Role";
import UserList from "@/widgets/UserList"
import { Content } from "antd/es/layout/layout"

const createIntialRoles = (): IRole[] => {
    const roles: IRole[] = [];
    for ( const [key, value] of Object.entries(TROLE)) {
        roles.push({name: key, type: value, isEnabled: false})
    }
    return roles
}

const users = [
    {login: 'L', password: 'ss', id:1, roles: createIntialRoles()},
    {login: 'rob', password: 'ss', id:2, roles: createIntialRoles()}
]
const StructureOrganisation = () => {

    
    return(
        <Content>
            <UserList users={users}/>
        </Content>
    )
}

export default StructureOrganisation