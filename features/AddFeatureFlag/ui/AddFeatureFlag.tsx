"use client"

import "./AddFeatureFlag.scss"

import { Button, Form, Switch } from "antd"
import { IOrganization } from "@/entities/Organization/model/useOrganizationStore"
import { useAddFeatureFlag } from "../model/useAddFeatureFlag"
import { AddButton, TextInput } from "@/shared/ui"
import { SelectDepartmentSearchDropMenu } from "@/features/SelectDepartmentSearchDropMenu"

type Props = {
	organization: IOrganization
}

export const AddFeatureFlag = ({ organization }: Props) => {
	const {
		form,
		isVisible,
		setIsVisible,
		departments,
		defaultDepartmentId,
		handleFormSubmit,
	} = useAddFeatureFlag(organization)

	return (
		<div className="add-feature-flag">
			<AddButton onClick={() => setIsVisible((v) => !v)} />
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
					<div className="feature-flag-form__data">
						<Form.Item
							name="name"
							rules={[
								{
									required: true,
									message:
										"Фич флаг должен иметь название",
								},
								{
									min: 1,
									message:
										"Длина названия фич флага должно быть больше 1",
								},
							]}
						>
							<TextInput placeholder="Название фич флага" />
						</Form.Item>

						<Form.Item name="value" valuePropName="checked">
							<Switch />
						</Form.Item>
					</div>

					<Form.Item
						name="departmentId"
						rules={[
							{
								required: true,
								message: "Пожалуйста, выберите отдел",
							},
						]}
					>
						<SelectDepartmentSearchDropMenu
							onSelect={(dep) => {
								form.setFieldValue(
									"departmentId",
									dep?.id ?? null,
								)
							}}
							departments={departments}
						/>
					</Form.Item>

					<Form.Item>
						<div className="add-feature-flag__buttons">
							<Button
								className="add-feature-flag__button"
								htmlType="submit"
							>
								Добавить
							</Button>
							<Button
								className="add-feature-flag__button"
								onClick={() => form.resetFields()}
								style={{ marginLeft: "8px" }}
							>
								Сброс
							</Button>
						</div>
					</Form.Item>
				</Form>
			)}
		</div>
	)
}
