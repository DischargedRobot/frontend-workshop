import { useState } from "react"
import { Form } from "antd"
import {
	useDepartmentsStore,
	useSelectedDepartmentsStore,
} from "@/entities/Departments"
import { departmentApi } from "@/entities/Departments"
import { useOrganisationStore } from "@/entities/Organisation"
import { useAPIErrorHandler } from "@/shared/api/APIErrorHandler"

interface AddDepartmentForm {
	name: string
	isService: boolean
	parentId: number
}

export const useAddDepartment = () => {
	const [form] = Form.useForm<AddDepartmentForm>()
	const [isCollapsed, setIsCollapsed] = useState(true)

	const addDepartToParent = useDepartmentsStore(
		(state) => state.addDepartmentToParent,
	)
	const organisationId = useOrganisationStore(
		(state) => state.organisation.id,
	)
	const selectedDepartments = useSelectedDepartmentsStore(
		(state) => state.departments,
	)
	const handleError = useAPIErrorHandler()

	const onFinish = async (values: AddDepartmentForm) => {
		const parentId = values.parentId ?? selectedDepartments.at(-1)?.id
		if (parentId == undefined) return

		try {
			const newDep = await departmentApi.addDepartment(
				values.name,
				organisationId,
				parentId,
				values.isService,
			)
			addDepartToParent(parentId, newDep)
			form.resetFields()
			setIsCollapsed(true)
		} catch (error) {
			handleError(error as Error)
		}
	}

	return {
		form,
		isCollapsed,
		setIsCollapsed,
		onFinish,
	}
}
