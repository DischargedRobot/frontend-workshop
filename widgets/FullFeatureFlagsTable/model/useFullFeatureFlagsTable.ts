import { FFApi, useFFStore } from "@/entities/FF"
import { useOrganizationStore } from "@/entities/Organization"
import { useShallow } from "zustand/shallow"
import { useBreadcrumbStore } from "@/entities/DepartmentBreadcamb"
import { useCallback } from "react"

export const useFullFeatureFlagsTable = () => {
	const organization = useOrganizationStore((state) => state.organization)

	// Последний депаратмент в хлебных крошках
	// Всегда есть (самый первый - узел органзиации)
	const lastDep = useBreadcrumbStore(
		useShallow((state) => state.getLastDepartment() ?? organization.child),
	)

	const setFeatureFlag = useFFStore((state) => state.setFeatureFlags)

	// Событие для кнопки "обновить"
	const reloadFeatureFlags = useCallback(async () => {
		const response = await FFApi.getFFsByDepartments(
			lastDep.children,
			organization.id,
			100,
			0,
		)
		setFeatureFlag(response.FFs)
	}, [lastDep, organization, setFeatureFlag])

	return {
		organization,
		lastDepInBredcrumb: lastDep?.id ?? organization.child.id,
		reloadFeatureFlags,
	}
}
