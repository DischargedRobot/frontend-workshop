import Role, { IRole, TROLE } from "@/shared/Role"

const RoleList = () => {

    const roles: IRole[] = [
        {name: 'DC', type: TROLE.DC},
        {name: 'UD', type: TROLE.UD}
    ]
    return (
        <ul>
           {roles.map(role => (
            <li key={crypto?.randomUUID()}>
                {Role(role)}
            </li>
           ))} 
        </ul>
    )
}

export default RoleList