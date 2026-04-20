import { functionInitApplication } from "../functionInitApplication"
import { userApiServer } from "@/entities/User/api/userApiServer"
import { InitStructureOrganization } from "./InitStructureOrganization"
import { cookies } from "next/headers"
import { departmentApiServer } from "@/entities/Departments/api/departmentApiServer"
import { IOrganization } from "@/entities/Organization"

async function getUsers(
    department: Awaited<ReturnType<typeof getDepartment>>,
    cookiesStore: string,
) {
    try {
        return await userApiServer.getUsersByDepartments(department.children, cookiesStore)
    } catch {
        return []
    }
}

async function getDepartment(
    organization: IOrganization,
    cookiesStore: string,
) {
    try {
        return await departmentApiServer.getSubTreeOfDepartments(
            organization.id,
            organization.child.id,
            cookiesStore,
        )
    } catch {
        return { ...organization.child }
    }
}

const StructureOrganizationLayout = async ({ children }: { children: React.ReactNode }) => {
    const { organization } = await functionInitApplication()
    const cookiesStore = (await cookies()).toString()
    const departments = await getDepartment(
        organization,
        cookiesStore,
    )
    const users = await getUsers(departments, cookiesStore)

    const organizationWithDepartments = {
        ...organization, child: { ...departments }
    }
    console.log(departments, "StructureOrganizationLayout get departments", organizationWithDepartments)
    return (
        <InitStructureOrganization users={users} organization={organizationWithDepartments} >
            {children}
        </InitStructureOrganization >
    )
}

export default StructureOrganizationLayout
