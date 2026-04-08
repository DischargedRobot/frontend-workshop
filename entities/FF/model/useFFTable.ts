import { FFApi } from "../api"
import { useOrganizationStore } from "@/entities/Organization"
import { IFeatureFlag } from "../lib/types"
import useFFStore from "./useFFStrore"
import { useFFTableColumns } from "./useFFTableColumns"
import { useAPIErrorHandler } from "@/shared/api/APIErrorHandler"
import { APIError } from "@/shared/api"

export const useFFTable = () => {
	const organizationId = useOrganizationStore(
		(state) => state.organization.id,
	)
	const removeFFFromLocal = useFFStore((state) => state.removeFeatureFlags)

	const handleAPIError = useAPIErrorHandler()

	const removeFF = async (FF: IFeatureFlag) => {
		try {
			await FFApi.removeFF(organizationId, FF.departmentId, FF.id)
		} catch (error) {
			handleAPIError(error as APIError)
		}
		removeFFFromLocal([FF])
	}

	const toggleFF = async (FF: IFeatureFlag, value: boolean) => {
		try {
			await FFApi.switchFeatureFlags(
				organizationId,
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
