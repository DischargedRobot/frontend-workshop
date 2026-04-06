"use client"

import { LogOutButton } from "@/shared/ui/LogOutButton"
import { useLogOut } from "../model"

interface LogOutProps {
	className?: string
}

export const LogOut = ({ className }: LogOutProps) => {
	const { logOut } = useLogOut()

	return <LogOutButton onClick={logOut} />
}
