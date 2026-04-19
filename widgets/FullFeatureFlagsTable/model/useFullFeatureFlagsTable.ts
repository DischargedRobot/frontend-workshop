import { useOrganizationStore } from "@/entities/Organization"

export const useFullFeatureFlagsTable = () => {
	const organization = useOrganizationStore((state) => state.organization)

	return organization
}
