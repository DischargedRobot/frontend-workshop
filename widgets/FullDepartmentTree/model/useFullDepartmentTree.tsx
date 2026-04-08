import { useDepartmentsStore } from "@/entities/Departments"
import { useOrganizationStore } from "@/entities/Organization"
import { useShallow } from "zustand/shallow"

export const useFullDepartmentTree = () => {
	const organization = useOrganizationStore((state) => state.organization)
	const departments = useDepartmentsStore(
		useShallow((state) => state.getDepartmentsIncludingAllChildren()),
	)

	return {
		organization,
		departments,
	}
}
