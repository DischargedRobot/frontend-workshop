"use client"

import "./AddFeatureFlag.scss"

import { Button, Form, Input, Select, Switch } from "antd"
import { IOrganisation } from "@/entities/Organisation/model/useOrganisationStore"
import { useAddFeatureFlag } from "../model/useAddFeatureFlag"

type Props = {
	organisation: IOrganisation
}

export const AddFeatureFlag = ({ organisation }: Props) => {
	const {
		form,
		isVisible,
		setIsVisible,
		departmentOptions,
		defaultDepartmentId,
		handleFormSubmit,
	} = useAddFeatureFlag(organisation)

	return (
		<div className="add-feature-flag">
			<Button type="primary" onClick={() => setIsVisible((v) => !v)}>
				Добавить
			</Button>
			{isVisible && (
				<Form
					form={form}
					className="add-feature-flag__feature-flag-form feature-flag-form"
					layout="vertical"
					onFinish={handleFormSubmit}
					initialValues={{
						value: false,
						departmentId: defaultDepartmentId,
					}}
				>
					<Form.Item
						name="name"
						label="Имя фич флага"
						rules={[
							{
								required: true,
								message: "Пожалуйста, введите имя фич флага",
							},
							{
								min: 1,
								message:
									"Длина имени фич флага должно быть больше 1",
							},
						]}
					>
						<Input placeholder="Имя фич флага" />
					</Form.Item>

					<Form.Item
						name="value"
						label="Значение"
						valuePropName="checked"
					>
						<Switch />
					</Form.Item>

					<Form.Item
						name="departmentId"
						label="Отдел"
						rules={[
							{
								required: true,
								message: "Пожалуйста, выберите отдел",
							},
						]}
					>
						<Select
							placeholder="Выберите отдел"
							options={departmentOptions}
						/>
					</Form.Item>

					<Form.Item>
						<Button type="primary" htmlType="submit">
							Добавить
						</Button>
						<Button
							onClick={() => form.resetFields()}
							style={{ marginLeft: "8px" }}
						>
							Сброс
						</Button>
					</Form.Item>
				</Form>
			)}
		</div>
	)
}
