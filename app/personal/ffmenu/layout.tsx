import { functionInitApplication } from "../functionInitApplication"
import { InitFFMenu } from "./InitFFMenu"
import { departmentApiServer } from "@/entities/Departments/api/departmentApiServer"
import { cookies } from "next/headers"

async function getDepartments(organizationId: number, childId: number, cookiesStore: string) {
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

const FFMenuLayout = async ({ children }: { children: React.ReactNode }) => {
    const { organization } = await functionInitApplication()
    const cookiesStore = (await cookies()).toString()
    const departments = await getDepartments(organization.id, organization.child.id, cookiesStore)

    return (
        <InitFFMenu
            departments={departments}
            organization={organization}
        >
            {children}
        </InitFFMenu>
    )
}

export default FFMenuLayout
