import { useEffect } from "react"
import useBreadcrumbStore from "./useBreadcrumbStore"
import { useFFFiltersStore } from "@/entities/FF"
import { useOrganizationStore } from "@/entities/Organization"
import { IDepartment } from "@/entities/Departments"

export const useDepartmentBreadcrumb = () => {
	const path = useBreadcrumbStore((state) => state.path)
	const setPath = useBreadcrumbStore((state) => state.setPath)

	// изначально ставим корневой узел организации
	const rootDepartment = useOrganizationStore(
		(state) => state.organization.child,
	)

	const setDepartmentFilters = useFFFiltersStore(
		(state) => state.setDepartments,
	)

	useEffect(() => {
		setPath([rootDepartment])
	}, [rootDepartment, setPath])

	// при клике берём всех до текущего включительно
	// и детей текущего отдела и закидывает в фильтр для фф
	const onBreadcrumbClick = (item: IDepartment, index: number) => {
		setDepartmentFilters([...path.slice(0, index + 1), ...item.children])
		setPath(path.slice(0, index + 1))
	}

	return { path, onBreadcrumbClick }
}
