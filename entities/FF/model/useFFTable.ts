import { FFApi } from "../api"
import { useOrganisationStore } from "@/entities/Organisation"
import { IFeatureFlag } from "../lib/types"
import useFFStore from "./useFFStrore"
import { useFFTableColumns } from "./useFFTableColumns"
import { useAPIErrorHandler } from "@/shared/api/APIErrorHandler"
import { APIError } from "@/shared/api"

export const useFFTable = () => {
	const organisationId = useOrganisationStore(
		(state) => state.organisation.id,
	)
	const removeFFFromLocal = useFFStore((state) => state.removeFeatureFlags)

	const handleAPIError = useAPIErrorHandler()

	const removeFF = async (FF: IFeatureFlag) => {
		try {
			await FFApi.removeFF(organisationId, FF.departmentId, FF.id)
		} catch (error) {
			handleAPIError(error as APIError)
		}
		removeFFFromLocal([FF])
	}

	const toggleFF = async (FF: IFeatureFlag, value: boolean) => {
		try {
			await FFApi.switchFeatureFlags(
				organisationId,
				FF.departmentId,
				FF.id,
				value,
			)
		} catch (error) {
			handleAPIError(error as APIError)
		}
	}

	const columns = useFFTableColumns({ removeFF, toggleFF })

	return { removeFF, toggleFF, columns }
}
