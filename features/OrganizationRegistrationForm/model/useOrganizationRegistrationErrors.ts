import { useCallback, useMemo } from "react"
import { useAPIErrorHandler } from "@/shared/api/APIErrorHandler"
import { mapAPIErrors, APIError } from "@/shared/api"

export interface Registration409Error {
	organization?: string
	login?: string
}

export const useOrganizationRegistrationErrors = (
	setError: React.Dispatch<React.SetStateAction<Registration409Error | null>>,
) => {
	const handle409 = useCallback(
		(error: APIError) => {
			setError((prev) => {
				if (error.message.toLocaleLowerCase().includes("login")) {
					return {
						...(prev ?? {}),
						login: "Логин уже существует",
					}
				}
				return {
					...(prev ?? {}),
					organization: "Имя организации уже существует",
				}
			})
		},
		[setError],
	)

	const customHandlers = useMemo(
		() => [
			{
				error: mapAPIErrors(409),
				handler: handle409,
			},
		],
		[handle409],
	)

	return useAPIErrorHandler(customHandlers)
}

export default useOrganizationRegistrationErrors
