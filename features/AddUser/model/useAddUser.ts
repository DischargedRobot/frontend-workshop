import { useState } from "react"
import { TROLE, IRole } from "@/shared/model/Role/types"
import { useDepartmentsStore } from "@/entities/Departments"
import { useShallow } from "zustand/shallow"
import { useForm } from "antd/es/form/Form"
import { useAddUserGetUrl } from "./useAddUserGetUrl"

interface Form {
	departmentUuid: string | null
	roles: IRole[] | null
}

export const useAddUser = () => {
	const departments = useDepartmentsStore(
		useShallow((state) => {
			const allDepts = state.getDepartmentsIncludingAllChildren?.()
			return allDepts ? allDepts.slice(1) : []
		}),
	)

	const [isClean, setIsClean] = useState(true)
	const [isNotFull, setIsNotFull] = useState(false)

	const [roles, setRoles] = useState<IRole[]>(
		Object.entries(TROLE).map(([key, value]) => ({
			name: key as keyof typeof TROLE,
			type: value,
			isEnabled: false,
		})),
	)

	const { url, handleGetToken, isLoading, resetUrl } = useAddUserGetUrl()

	const handleRolesChange = (allRoles: IRole[]) => {
		setRoles(allRoles)
	}

	const onSubmit = (formData: Form) => {
		if (formData.departmentUuid)
			handleGetToken(formData.departmentUuid, roles)
	}

	const handleReset = () => {
		const resetRoles = roles.map((role) => ({
			...role,
			isEnabled: false,
		}))
		setRoles(resetRoles)
		resetUrl()
		setIsClean(true)
		setIsNotFull(false)
		form.resetFields()
	}

	const [form] = useForm<Form>()

	const departmentOptions = departments.map((dept) => ({
		key: dept.uuid ?? dept.id.toString(),
		value: dept.uuid,
		label: dept.name,
	}))

	const isDisabled = departments.length === 0 ? true : false

	// для формы, при изменении полей проверяем, что выбрана роль и отдел,
	//  если оба есть - можно генерировать ссылку, если нет - показываем тултип и дизейблим кнопку
	const onValuesChange = (_: unknown, allValues: Form) => {
		console.log("Form values changed: ", allValues) // Логируем текущие значения формы
		const hasEnabledRoles =
			allValues.roles?.some((role) => role.isEnabled) ?? false
		const isFull = !!allValues.departmentUuid && hasEnabledRoles
		setIsNotFull(isFull)
		const isDirty = !!allValues.departmentUuid || hasEnabledRoles
		setIsClean(!isDirty)
	}

	return {
		onSubmit,
		roles,
		setRoles,
		handleRolesChange,
		url,
		handleGetToken,
		handleReset,
		departmentOptions,
		form,
		onValuesChange,
		isClean,
		isNotFull,
		isDisabled,
		isLoading,
	}
}
