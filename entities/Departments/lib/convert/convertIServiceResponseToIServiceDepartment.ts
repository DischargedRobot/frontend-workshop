import { IService, IServiceDepartment } from ".."
import { IDepartmentResponse } from "../../api/departmentApi"

/** @desc Конвертер ответа сервиса в тип `IServiceDepartment` */
export const convertIServiceResponseToIServiceDepartment = (
    serviceResponse: IService & IDepartmentResponse,
): IServiceDepartment => ({
    ...serviceResponse,
    children: [],
    featureFlags: [],
})
