"use client"

import "./DeleteSelectedDepartments.scss"

import { useDeleteSelectedDepartments } from "../model"
import { DeleteButton } from "@/shared/ui"

const DeleteSelectedDepartments = () => {
	const { deleteDepartments } = useDeleteSelectedDepartments()

	return <DeleteButton title="Удалить выбранные отделы" onClick={deleteDepartments} />
}

export default DeleteSelectedDepartments
