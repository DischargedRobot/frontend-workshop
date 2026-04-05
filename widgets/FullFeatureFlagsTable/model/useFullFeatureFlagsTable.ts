import { FFApi, useFFStore, useFFFiltersStore } from "@/entities/FF"
import { useDepartmentsStore } from "@/entities/Departments"
import { useOrganisationStore } from "@/entities/Organisation"
import { useShallow } from "zustand/shallow"
import { useBreadcrumbStore } from "@/entities/DepartmentBreadcamb"

export const useFullFeatureFlagsTable = () => {
	const organisation = useOrganisationStore((state) => state.organisation)

	// Последний депаратмент в хлебных крошках
	// Всегда есть (самый первый - узел органзиации)
	const lastDep = useBreadcrumbStore(
		useShallow((state) => state.getLastDepartment() ?? organisation.child),
	)

	const setFeatureFlag = useFFStore((state) => state.setFeatureFlags)
	const setFeatureFlagName = useFFFiltersStore((state) => state.setName)

	// Событие для кнопки "обновить"
	const reloadFeatureFlags = async () => {
		const response = await FFApi.getFFsByDepartments(
			lastDep.children.map((dep) => dep.id),
			organisation.id,
			100,
			0,
		)
		setFeatureFlag(response.FFs)
	}

	return {
		organisationId: organisation.id,
		lastDepInBredcrumb: lastDep.id,
		setFeatureFlagName,
		reloadFeatureFlags,
	}
}
