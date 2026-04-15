import { IDepartment } from "../DepartmentType"
import { IDepartmentResponse } from "../../api/departmentApi"

/** @desc Преобразует плоский список ответов API в массив первых потомков (top-level children) */

export const reduceDepRespToArray = (
    departmentsResponse: IDepartmentResponse[],
): IDepartment[] => {
    const nodeMap = new Map<number, IDepartment>()

    departmentsResponse.forEach((depResp) => {
        nodeMap.set(depResp.id, {
            ...depResp,
            children: [],
            featureFlags: [],
        })
    })

    const children: IDepartment[] = []

    departmentsResponse.forEach((depResp) => {
        const path = depResp.path.split(".").map((item) => parseInt(item))
        if (path.at(-1) === undefined) {
            throw new Error("Invalid department response")
        } else {
            if (
                path.at(-2) !== undefined &&
                nodeMap.get(path.at(-2)!) === undefined
            ) {
                children.push(nodeMap.get(depResp.id)!)
            } else {
                nodeMap
                    .get(path.at(-2)!)!
                    .children.push(nodeMap.get(depResp.id)!)
            }
        }
    })

    return children
}
