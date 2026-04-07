"use client"

import "./AddFeatureFlag.scss"

import { Button, Form, Switch } from "antd"
import { IOrganisation } from "@/entities/Organisation/model/useOrganisationStore"
import { useAddFeatureFlag } from "../model/useAddFeatureFlag"
import { AddButton, TextInput } from "@/shared/ui"
import { SelectDepartmentSearchDropMenu } from "@/features/SelectDepartmentSearchDropMenu"

type Props = {
	organisation: IOrganisation
}

export const AddFeatureFlag = ({ organisation }: Props) => {
	const {
		form,
		isVisible,
		setIsVisible,
		departments,
		defaultDepartmentId,
		handleFormSubmit,
	} = useAddFeatureFlag(organisation)

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
										"Пожалуйста, введите имя фич флага",
								},
								{
									min: 1,
									message:
										"Длина имени фич флага должно быть больше 1",
								},
							]}
						>
							<TextInput placeholder="Имя фич флага" />
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
