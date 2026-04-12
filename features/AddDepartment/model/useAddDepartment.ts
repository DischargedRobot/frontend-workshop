import { useState } from "react"
import { Form } from "antd"
import {
	IDepartment,
	IService,
	useDepartmentsStore,
	useSelectedDepartmentsStore,
} from "@/entities/Departments"
import { departmentApi } from "@/entities/Departments"
import { useOrganizationStore } from "@/entities/Organization"
import { useAPIErrorHandler } from "@/shared/api/APIErrorHandler"

interface AddDepartmentForm {
	name: string
	isService: boolean
	parentId: number
}

export const useAddDepartment = ({
	onServiceCreated,
}: { onServiceCreated?: (service: IService) => void } = {}) => {
	const [form] = Form.useForm<AddDepartmentForm>()
	const [isCollapsed, setIsCollapsed] = useState(true)

	const addDepartToParent = useDepartmentsStore(
		(state) => state.addDepartmentToParent,
	)
	const organizationId = useOrganizationStore(
		(state) => state.organization.id,
	)
	const selectedDepartments = useSelectedDepartmentsStore(
		(state) => state.departments,
	)
	const handleError = useAPIErrorHandler()

	// добавление департамена
	const onSubmit = async (values: AddDepartmentForm) => {
		const parentId = values.parentId ?? selectedDepartments.at(-1)?.id
		if (parentId == undefined) return

		try {
			console.log("Submitting form with values:", values) // Логируем значения формы
			if (values.isService) {
				const newService = await departmentApi.addService(
					values.name,
					organizationId,
					parentId,
				)

				const [service, department]: [IService, IDepartment] = [
					{
						topicName: newService.topicName,
						username: newService.username,
						password: newService.password,
						groupName: newService.groupName,
					},
					{
						id: newService.id,
						uuid: newService.uuid,
						name: newService.name ?? "",
						path: newService.path ?? "",
						isService: true,
						version: newService.version ?? 0,
						children: [],
						featureFlags: [],
					},
				]
				addDepartToParent(parentId, department)

				// Колбэк для передачи сервиса наверх (виджету)
				onServiceCreated?.(service)
			} else {
				const newDep = await departmentApi.addDepartment(
					values.name,
					organizationId,
					parentId,
				)
				addDepartToParent(parentId, newDep)
			}

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
		onSubmit,
	}
}
