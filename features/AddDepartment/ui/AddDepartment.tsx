"use client"
import { AddButton } from "@/shared/ui"
import "./AddDepartment.scss"
import { Button, Form, Input, Switch } from "antd"
import { useAddDepartment } from "../model/useAddDepartment"

type DepartmentSelectorComponent = React.ComponentType<{
	onChange: (id: number) => void
}>

type Props = {
	DepartmentSelector: DepartmentSelectorComponent
}

const AddDepartment = ({ DepartmentSelector }: Props) => {
	const { form, isCollapsed, setIsCollapsed, onFinish } = useAddDepartment()

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
