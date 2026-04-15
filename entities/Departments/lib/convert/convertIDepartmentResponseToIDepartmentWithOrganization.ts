import { IDepartment } from "../DepartmentType"
import { IDepartmentResponse } from "../../api/departmentApi"
import { IOrganization } from "@/entities/Organization"

/** @desc Конвертер списка ответов API в массив департаментов с учётом организации (заполняет tree) */

export const convertIDepartmentResponseToIDepartmentWithOrganization = (
    departmentsResponse: IDepartmentResponse[],
    organization: IOrganization,
): IDepartment[] => {
    const nodeMap = new Map<number, IDepartment>()

    departmentsResponse.forEach((depResp) => {
        nodeMap.set(depResp.id, {
            ...depResp,
            children: [],
            featureFlags: [],
        })
    })

    const nodes: IDepartment[] = []
    departmentsResponse.forEach((item) => {
        const path = item.path.split(".")
        if (path.length <= 2) {
            if (path.length == 2) {
                const node = nodeMap.get(parseInt(path[1]))!
                organization.child.children.push(node)
                nodes.push(node)
            } else {
                organization.child = nodeMap.get(parseInt(path[0]))!
            }
        } else if (path.length > 2) {
            nodeMap
                .get(parseInt(path.at(-2)!))
                ?.children.push(nodeMap.get(item.id)!)
        }
    })

    return nodes
}
