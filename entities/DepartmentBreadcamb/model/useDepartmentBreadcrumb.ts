import { useEffect } from "react"
import useBreadcrumbStore from "./useBreadcrumbStore"
import { useFFFiltersStore } from "@/entities/FF"
import { useOrganisationStore } from "@/entities/Organisation"
import { IDepartment } from "@/entities/Departments"

export const useDepartmentBreadcrumb = () => {
	const path = useBreadcrumbStore((state) => state.path)
	const setPath = useBreadcrumbStore((state) => state.setPath)

	// изначально ставим корневой узел организации
	const rootDepartment = useOrganisationStore(
		(state) => state.organisation.children,
	)

	const setDepartmentFilters = useFFFiltersStore(
		(state) => state.setDepartment,
	)

	useEffect(() => {
		setPath([rootDepartment])
	}, [rootDepartment, setPath])

	// при клике берём всех до текущего включительно
	// и детей текущего отдела и закидывает в фильтр для фф
	const onBreadcrumbClick = (item: IDepartment, index: number) => {
		setDepartmentFilters([
			...path.slice(0, index + 1).map((department) => department.id),
			...item.children.map((department) => department.id),
		])
		setPath(path.slice(0, index + 1))
	}

	return { path, onBreadcrumbClick }
}
