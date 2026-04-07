import { useDepartmentsStore } from "@/entities/Departments/model/useDepartmentsStore"
import { IDepartment } from "@/entities/Departments"
import { useMemo } from "react"
import { useShallow } from "zustand/shallow"

interface UseSelectDepartmentProps {
	departments?: IDepartment[]
}

export const useSelectDepartment = ({
	departments: departmentsProp,
}: UseSelectDepartmentProps = {}) => {
	const departmentsFromStore = useDepartmentsStore(
		useShallow((state) => state.getDepartmentsIncludingAllChildren()),
	)

	const departments = useMemo(
		() => departmentsProp ?? departmentsFromStore,
		[departmentsProp, departmentsFromStore],
	)

	const options = useMemo(
		() =>
			departments.map((dep) => ({
				label: dep.name,
				value: dep,
			})),
		[departments],
	)

	return { departments, options }
}
