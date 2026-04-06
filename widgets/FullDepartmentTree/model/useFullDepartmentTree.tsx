import { useDepartmentsStore } from "@/entities/Departments"
import { useOrganisationStore } from "@/entities/Organisation"
import { useShallow } from "zustand/shallow"

export const useFullDepartmentTree = () => {
	const organisation = useOrganisationStore((state) => state.organisation)
	const departments = useDepartmentsStore(
		useShallow((state) => state.getDepartmentsIncludingAllChildren()),
	)

	return {
		organisation,
		departments,
	}
}
