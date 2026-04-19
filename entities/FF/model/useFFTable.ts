import { FFApi } from "../api"
import { useOrganizationStore } from "@/entities/Organization"
import { IFeatureFlag } from "../lib/types"
import useFFStore from "./useFFStrore"
import { useFFTableColumns } from "./useFFTableColumns"
import { useAPIErrorHandler } from "@/shared/api/APIErrorHandler"
import { APIError, mapAPIErrors } from "@/shared/api"
import { showToast } from "@/shared/ui"
import { useMemo } from "react"
import { handler } from "next/dist/build/templates/app-route"
import { FFAPIErrors, isFFAPIError } from "@/shared/api/APIErrors"

export const useFFTable = () => {
	const organizationId = useOrganizationStore(
		(state) => state.organization.id,
	)
	const removeFFFromLocal = useFFStore((state) => state.removeFeatureFlags)

	const handleAPIError = useAPIErrorHandler()

	const handlersToggleAPIError = useMemo(
		() => [
			{
				error: FFAPIErrors.OPTIMISTIC_LOCK,
				handler: () => {
					showToast({
						type: "warning",
						title: "Конфликт версий",
						text: "Флаг был изменён другим пользователем — применена серверная версия",
					})
				},
			},
			{
				error: mapAPIErrors(404),
				handler: () =>
					showToast({
						type: "error",
						title: "Ошибка при изменении фичи",
						text: "Фича не найдена. Возможно, она была удалена другим пользователем. Пожалуйста, обновите страницу или список фич флагов",
					}),
			},
			{
				error: mapAPIErrors(409),
				handler: () =>
					showToast({
						type: "error",
						title: "Ошибка при изменении фичи",
						text: "Вероятно, фича была изменена другим пользователем. Пожалуйста, обновите страницу или список фич флагов и попробуйте снова",
					}),
			},
		],
		[],
	)
	const handleToggleAPIError = useAPIErrorHandler(handlersToggleAPIError)

	const updateFF = useFFStore((state) => state.updateFeatureFlag)
	const setToggling = useFFStore((state) => state.setToggling)
	const removeFF = async (FF: IFeatureFlag) => {
		try {
			await FFApi.removeFF(organizationId, FF.departmentId, FF.id)
		} catch (error) {
			// console.error("Error removing feature flag:", error)
			handleAPIError(error as APIError)
		}
		removeFFFromLocal([FF])
	}

	const handlerGetAPIError = useAPIErrorHandler([
		{
			error: mapAPIErrors(404),
			handler: () =>
				showToast({
					type: "error",
					title: "Ошибка при получении фичи",

					text: "Фича не найдена. Возможно, она была удалена другим пользователем. Пожалуйста, обновите страницу или список фич флагов",
				}),
		},
	])

	const toggleFF = async (FF: IFeatureFlag, value: boolean) => {
		const previouslyFF = { ...FF }
		setToggling(FF.id, true)
		updateFF({ ...FF, value, isToggling: true }) // оптимистичный ui

		try {
			const featureFlag = await FFApi.switchFF(organizationId, FF, value)
			updateFF({ ...featureFlag, isToggling: false })
		} catch (error) {
			// если ошибка с версиями, нужно получить свежую фичу
			// с сервера и обновить её в сторе,
			// иначе откатить только переключение isToggling
			try {
				if (
					(error as APIError).type ===
					FFAPIErrors.OPTIMISTIC_LOCK.code
				) {
					const fresh = await FFApi.getFFById(
						organizationId,
						FF.departmentId,
						FF,
					)
					updateFF({ ...fresh, isToggling: false })
				} else {
					updateFF({ ...previouslyFF, isToggling: false })
				}
			} catch (innerError) {
				handlerGetAPIError(error)

				updateFF({ ...previouslyFF, isToggling: false })
			}
			handleToggleAPIError(error as APIError)
		} finally {
			setToggling(FF.id, false)
		}
	}

	const columns = useFFTableColumns({ removeFF, toggleFF })

	return { removeFF, toggleFF, columns }
}
