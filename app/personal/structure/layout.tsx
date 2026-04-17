import { functionInitApplication } from "../functionInitApplication"
import { userApiServer } from "@/entities/User/api/userApiServer"
import { InitStructureOrganization } from "./InitStructureOrganization"
import { cookies } from "next/headers"
import { departmentApiServer } from "@/entities/Departments/api/departmentApiServer"

async function getUsers(
    departments: Awaited<ReturnType<typeof getDepartments>>,
    cookiesStore: string,
) {
    try {
        return await userApiServer.getUsersByDepartments(departments, cookiesStore)
    } catch {
        return []
    }
}

async function getDepartments(
    organizationId: number,
    childId: number,
    cookiesStore: string,
) {
    try {
        return await departmentApiServer.getChildrenOfDepartments(
            organizationId,
            childId,
            cookiesStore,
        )
    } catch {
        return []
    }
}

const StructureOrganizationLayout = async ({ children }: { children: React.ReactNode }) => {
    const { organization } = await functionInitApplication()
    const cookiesStore = (await cookies()).toString()
    const departments = await getDepartments(
        organization.id,
        organization.child.id,
        cookiesStore,
    )
    const users = await getUsers(departments, cookiesStore)

    return (
        <InitStructureOrganization users={users}>
            {children}
        </InitStructureOrganization>
    )
}

export default StructureOrganizationLayout
