"use client"

import "./AddDepartment.scss"

import { AddButton } from "@/shared/ui"
import { Button, Form, Input, Popover, Switch } from "antd"
import { useAddDepartment } from "../model/useAddDepartment"
import { memo } from "react"
import { IService } from "@/entities/Departments"

type DepartmentSelectorComponent = React.ComponentType<{
	onChange: (id: number) => void
}>

type Props = {
	DepartmentSelector: DepartmentSelectorComponent
	onServiceCreated?: (service: IService) => void
}

const AddDepartment = ({ DepartmentSelector, onServiceCreated }: Props) => {
	const { form, isCollapsed, setIsCollapsed, onSubmit } = useAddDepartment({ onServiceCreated })


	const AddDepForm = (
		<div className="add-department">
			<Form
				form={form}
				className={`add-department__panel ${isCollapsed ? "add-department__panel_collapsed" : ""}`}
				onFinish={onSubmit}
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
				<div className="add-department__switch-service">
					<span >Сервис</span>
					<Form.Item
						name="isService"
						valuePropName="checked"
						initialValue={false}
						className="add-department__switch"
					>

						<Switch />
					</Form.Item>
				</div>

				<Button htmlType="submit">Создать</Button>
			</Form>
		</div>
	)


	return (

		<Popover
			classNames={{ container: "add-department-popover" }}
			content={AddDepForm}
			autoAdjustOverflow
			placement="bottom"
			trigger="click"
		>
			<span>
				<AddButton onClick={() => setIsCollapsed((prev) => !prev)} />
			</span>
		</Popover>
	)
}

export default memo(AddDepartment)
