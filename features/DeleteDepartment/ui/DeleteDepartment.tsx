"use client"

import "./DeleteDepartment.scss"

import { useDeleteDepartment } from "../model"
import { DeleteButton } from "@/shared/ui"

const DeleteDepartment = () => {
	const { deleteDepartments } = useDeleteDepartment()

	return <DeleteButton onClick={deleteDepartments} />
}

export default DeleteDepartment
