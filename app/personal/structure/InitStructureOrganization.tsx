"use client"

import { useEffect } from "react"
import { useUsersStore } from "@/entities/User"
import { IUser } from "@/entities/User"
import { useDepartmentsStore, useSelectedDepartmentsStore } from "@/entities/Departments"
import { IOrganization } from "@/entities/Organization"

interface Props {
    users: IUser[]
    children: React.ReactNode
    organization: IOrganization
}


export const InitStructureOrganization = ({ users, children, organization }: Props) => {
    const setUsers = useUsersStore((state) => state.setUsers)
    const setDepartments = useDepartmentsStore((s) => s.setDepartments)
    console.log("InitStructureOrganization get organization", organization)
    useEffect(() => {
        setUsers(users)
        setDepartments([organization.child])

    }, [organization, setDepartments, setUsers, users])

    return <>{children}</>
}
