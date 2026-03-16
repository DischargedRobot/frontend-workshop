'use client'
import UserCard from "@/entities/UserCard/ui/UserCard"
import UserSettings from "@/features/UserSettings/ui/UserSettings"
import UserTestingPanelForTheme from "@/features/UserTestingPanelForTheme/UserTestingPanelForTheme"
import { IRole, TROLE } from "@/shared/Role"
import { Content } from "antd/es/layout/layout"

const createIntialRoles = (): IRole[] => {
    const roles: IRole[] = [];
    for ( const [key, value] of Object.entries(TROLE)) {
        roles.push({name: key, type: value, isEnabled: false})
    }
    return roles
}
const Profile = () => {

    // useEffect( 
    //     () => redirect('/ffmenu', RedirectType.push)
    // , [])
    return (
        <Content>
            <UserCard user={{login: 'Robo', password:'password', id: 1, roles: createIntialRoles(), departmentId:1}}/>
            <UserSettings/>
            <UserTestingPanelForTheme/>
        </Content>
    )
}

export default Profile