"use client"

import { loginApi } from "@/shared/api"
import { useRouter } from "next/navigation"

export const useLogOut = () => {
	const router = useRouter()

	const logOut = async () => {
		await loginApi.logOut()
		router.push("/auth")
	}

	return { logOut }
}
