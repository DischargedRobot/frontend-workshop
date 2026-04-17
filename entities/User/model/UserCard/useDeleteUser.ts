import { useCallback, useMemo } from "react"
import { useAPIErrorHandler } from "@/shared/api/APIErrorHandler"
import { userApiClient } from "../../api"
import { mapAPIErrors } from "@/shared/api"
import useUsersStore from "../useUsersStore"

interface Props {
	userId: number
}

export const useDeleteUser = ({ userId }: Props) => {
	const deleteUserFromStore = useUsersStore((state) => state.deleteUserById)

	// чтобы не кидать постоянно новый объект в апи хендлер
	const onDeletedHandler = useCallback(
		() => deleteUserFromStore(userId),
		[deleteUserFromStore, userId],
	)
	const handlers = useMemo(
		() => [
			{
				error: mapAPIErrors(404),
				handler: onDeletedHandler,
			},
		],
		[onDeletedHandler],
	)
	const handleError = useAPIErrorHandler(handlers)

	const deleteUser = useCallback(async () => {
		try {
			await userApiClient.deleteUserById(userId)
			deleteUserFromStore(userId)
		} catch (error) {
			handleError(error as Error)
		}
	}, [userId, deleteUserFromStore, handleError])

	return deleteUser
}

export default useDeleteUser
