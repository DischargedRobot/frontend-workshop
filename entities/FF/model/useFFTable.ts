import { FFApi } from "../api"
import { useOrganisationStore } from "@/entities/Organisation"
import { IFeatureFlag } from "../lib/types"
import useFFStore from "./useFFStrore"
import { useFFTableColumns } from "./useFFTableColumns"

export const useFFTable = () => {
	const organisationId = useOrganisationStore(
		(state) => state.organisation.id,
	)
	const removeFFFromLocal = useFFStore((state) => state.removeFeatureFlags)

	const removeFF = async (FF: IFeatureFlag) => {
		await FFApi.removeFF(organisationId, FF.departmentId, FF.id)
		removeFFFromLocal([FF])
	}

	const toggleFF = async (FF: IFeatureFlag, value: boolean) => {
		await FFApi.switchFeatureFlags(
			organisationId,
			FF.departmentId,
			FF.id,
			value,
		)
	}

	const columns = useFFTableColumns({ removeFF, toggleFF })

	return { removeFF, toggleFF, columns }
}
