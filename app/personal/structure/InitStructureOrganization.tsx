"use client"

import { useEffect } from "react"
import { useUsersStore } from "@/entities/User"
import { IUser } from "@/entities/User"

interface Props {
    users: IUser[]
    children: React.ReactNode
}

export const InitStructureOrganization = ({ users, children }: Props) => {
    const setUsers = useUsersStore((state) => state.setUsers)

    useEffect(() => {
        setUsers(users)
    }, [users, setUsers])

    return <>{children}</>
}
