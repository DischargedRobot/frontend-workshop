import { useShallow } from "zustand/shallow"
import { useDepartmentsStore } from "../useDepartmentsStore"
import { useFFFiltersStore } from "@/entities/FF"
import { useBreadcrumbStore } from "@/entities/DepartmentBreadcamb"
import { IDepartment } from "../../lib"
import { useFFMenu } from "@/app/personal/ffmenu/useFFMenu"

const getChildrenByPath = (
	departments: IDepartment[],
	departmentPath: IDepartment[] | undefined,
): IDepartment[] => {
	if (departmentPath === undefined) return []

	let children = departments
	for (let i = 0; i < departmentPath.length; i++) {
		const currentDep = children.find(
			(dep) => departmentPath[i].id == dep.id,
		)
		if (currentDep === undefined) return []
		children = currentDep.children
	}

	return children
}

export const useDepartmentTable = () => {
	const isHidden = useFFMenu((state) => state.isHidden)

	const departmentPath = useBreadcrumbStore(useShallow((state) => state.path))

	const departments = useDepartmentsStore(
		useShallow((state) =>
			getChildrenByPath(state.departments, departmentPath),
		),
	)

	const setSelectedDepartments = useFFFiltersStore(
		(state) => state.setDepartment,
	)

	const selectRow = (selectedRowKeys: number[]) => {
		if (selectedRowKeys.length === 0) {
			setSelectedDepartments([
				...departmentPath.map((dep) => dep.id),
				...departmentPath.at(-1)!.children.map((dep) => dep.id),
			])
		} else {
			setSelectedDepartments(selectedRowKeys as number[])
		}
	}

	return {
		isHidden,
		departments,
		selectRow,
	}
}
