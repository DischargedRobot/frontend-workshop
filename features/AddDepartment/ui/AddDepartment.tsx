"use client"

import "./AddDepartment.scss"

import { AddButton, TextInput } from "@/shared/ui"
import { Button, Form, Popover, Switch } from "antd"
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
	const { form, onSubmit, isLoading } = useAddDepartment({ onServiceCreated })


	const addDepForm = (
		<div className="add-department">
			<Form
				form={form}
				className={`add-department__panel `}
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
					<TextInput placeholder="Название отдела" />
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

				<Button
					type="default"
					htmlType="submit"
					loading={isLoading}
				>
					{isLoading ? "Создание..." : "Создать"}</Button>
			</Form>
		</div>
	)

	return (

		<Popover
			content={addDepForm}
			placement="bottom"
			autoAdjustOverflow
			getPopupContainer={(node) => node.parentElement ?? document.body}
			trigger="click"
		>
			<span>
				<AddButton title="Добавить отдел" />
			</span>
		</Popover>
	)
}

export default memo(AddDepartment)
