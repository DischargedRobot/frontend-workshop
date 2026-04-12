export { type IDepartmentResponse } from "./api"
export { departmentApi } from "./api"

export {
	type TableData,
	type IService,
	type IDepartment,
} from "./lib"

export { DepartmentTable } from "./ui"
export { DepartmentTree } from "./ui"
export { Service } from "./ui"

export {
	useDepartmentsStore,
	useSelectedDepartmentsStore,
} from "./model"
export { useDepartmentTableColumns } from "./model"
