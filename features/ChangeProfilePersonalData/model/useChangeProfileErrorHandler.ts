import { useRouter } from "next/router"
import { useMemo } from "react"
import { mapAPIErrors } from "@/shared/api"
import { showToast } from "@/shared/ui"
import { useAPIErrorHandler } from "@/shared/api/APIErrorHandler"

export default function useChangeProfileErrorHandler() {
	const router = useRouter()

	const handlers = useMemo(
		() => [
			{
				error: mapAPIErrors(404),
				handler: () => router.push("/login"),
			},
			{
				error: mapAPIErrors(403),
				handler: () =>
					showToast({ type: "error", text: "Неверный текущий пароль" }),
			},
			{
				error: mapAPIErrors(409),
				handler: () => showToast({ type: "error", text: "Логин занят" }),
			},
		],
		[router],
	)

	return useAPIErrorHandler(handlers)
}
