import { IDepartment } from "../DepartmentType"
import { IDepartmentResponse } from "../../api/departmentApi"

/** @desc Конвертер ответа API департамента в локальный тип `IDepartment` */

export function convertIDepartmentResponseToIDepartment(
    departmentResponse: IDepartmentResponse,
): IDepartment
export function convertIDepartmentResponseToIDepartment(
    departmentsResponse: IDepartmentResponse[],
): IDepartment[]

export function convertIDepartmentResponseToIDepartment(
    departmentsResponse: IDepartmentResponse | IDepartmentResponse[],
): IDepartment | IDepartment[] {
    if (Array.isArray(departmentsResponse)) {
        return departmentsResponse.map((depResp) => ({
            ...depResp,
            children: [],
            featureFlags: [],
        }))
    }

    return {
        ...departmentsResponse,
        children: [],
        featureFlags: [],
    }
}
