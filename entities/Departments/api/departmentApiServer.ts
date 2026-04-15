import { IDepartment } from "../lib"
import { departmentApiCommon } from "./departmentApiCommon"

const SERVER_URL = process.env.API_FF_SERVICE_URL_V1
if (!SERVER_URL) {
	throw new Error("API_FF_SERVICE_URL_V1 is not defined")
}
// TODO: отрефакторить все эти departmentApi

export const departmentApiServer = {
	getDepByUUID: async (
		uuidDepartment: string,
		cookieString: string,
	): Promise<{ department: IDepartment; organizationId: number }> => {
		return departmentApiCommon.getDepByUUID(
			SERVER_URL,
			uuidDepartment,
			cookieString,
		)
	},
}
