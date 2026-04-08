import { FFApi, useFFStore, useFFFiltersStore } from "@/entities/FF"
import { useDepartmentsStore } from "@/entities/Departments"
import { useOrganizationStore } from "@/entities/Organization"
import { useShallow } from "zustand/shallow"
import { useBreadcrumbStore } from "@/entities/DepartmentBreadcamb"

export const useFullFeatureFlagsTable = () => {
	const organization = useOrganizationStore((state) => state.organization)

	// Последний депаратмент в хлебных крошках
	// Всегда есть (самый первый - узел органзиации)
	const lastDep = useBreadcrumbStore(
		useShallow((state) => state.getLastDepartment() ?? organization.child),
	)

	const setFeatureFlag = useFFStore((state) => state.setFeatureFlags)
	const setFeatureFlagName = useFFFiltersStore((state) => state.setName)

	// Событие для кнопки "обновить"
	const reloadFeatureFlags = async () => {
		const response = await FFApi.getFFsByDepartments(
			lastDep.children.map((dep) => dep.id),
			organization.id,
			100,
			0,
		)
		setFeatureFlag(response.FFs)
	}

	return {
		organization,
		lastDepInBredcrumb: lastDep?.id ?? organization.child.id,
		setFeatureFlagName,
		reloadFeatureFlags,
	}
}
