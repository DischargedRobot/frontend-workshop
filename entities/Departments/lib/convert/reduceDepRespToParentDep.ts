import { IDepartment } from "../DepartmentType"
import { IDepartmentResponse } from "../../api/departmentApi"

/** @desc Сборка ответа API в родительский отдел — возвращает список прямых детей */

export const reduceDepRespToParentDep = (
    departmentsResponse: IDepartmentResponse[],
    parentDepartment: IDepartment,
): IDepartment[] => {
    const nodeMap = new Map<number, IDepartment>()

    departmentsResponse.forEach((depResp) => {
        nodeMap.set(depResp.id, {
            ...depResp,
            children: [],
            featureFlags: [],
        })
    })

    parentDepartment.children = []

    departmentsResponse.forEach((depResp) => {
        const path = depResp.path.split(".").map((item) => parseInt(item))
        if (path.at(-1) === undefined) {
            throw new Error("Invalid department response")
        } else {
            if (path.at(-2) === parentDepartment.id) {
                parentDepartment.children.push(nodeMap.get(depResp.id)!)
            } else {
                nodeMap
                    .get(path.at(-2)!)!
                    .children.push(nodeMap.get(depResp.id)!)
            }
        }
    })

    return parentDepartment.children
}
