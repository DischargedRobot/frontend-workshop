"use client"
import { AddButton } from "@/shared/ui"
import "./AddDepartment.scss"
import { useState } from "react"
import { Button, Form, Input, Switch } from "antd"
import { useDepartmentsStore } from "@/entities/Departments"
import { departmentApi } from "@/entities/Departments"
import { useOrganisationStore } from "@/entities/Organisation"
import { useAPIErrorHandler } from "@/shared/api/APIErrorHandler"

interface AddDepartmentForm {
	name: string
	isService: boolean
	parentId: number
}

type DepartmentSelectorComponent = React.ComponentType<{
	onChange: (id: number) => void
}>

type Props = {
	DepartmentSelector: DepartmentSelectorComponent
}

const AddDepartment = ({ DepartmentSelector }: Props) => {
	const [form] = Form.useForm<AddDepartmentForm>()
	const [isCollapsed, setIsCollapsed] = useState(true)

	const addDepartToParent = useDepartmentsStore(
		(state) => state.addDepartmentToParent,
	)
	const organisationId = useOrganisationStore(
		(state) => state.organisation.id,
	)
	const selectedDepartmentIds = useDepartmentsStore(
		(state) => state.selectedDepartmentIds,
	)
	const handleError = useAPIErrorHandler()
	const onFinish = async (values: AddDepartmentForm) => {
		const parentId = values.parentId ?? selectedDepartmentIds.at(-1)
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

	return (
		<div className="add-department">
			<AddButton onClick={() => setIsCollapsed((prev) => !prev)} />
			<Form
				form={form}
				className={`add-department__panel ${isCollapsed ? "add-department__panel_collapsed" : ""}`}
				onFinish={onFinish}
				layout="vertical"
			>
				<Form.Item
					className="add-department__field"
					name="name"
					rules={[
						{ required: true, message: "Введите название отдела" },
					]}
				>
					<Input autoComplete="off" placeholder="Название отдела" />
				</Form.Item>
				<Form.Item
					name="parentId"
					label="Родительский отдел"
					rules={[
						{
							required: true,
							message: "Выберите родительский отдел",
						},
					]}
				>
					<DepartmentSelector
						onChange={(id) => form.setFieldValue("parentId", id)}
					/>
				</Form.Item>
				<Form.Item
					name="isService"
					label="isService"
					valuePropName="checked"
					initialValue={false}
				>
					<Switch />
				</Form.Item>
				<Button htmlType="submit">Создать</Button>
			</Form>
		</div>
	)
}

export default AddDepartment
