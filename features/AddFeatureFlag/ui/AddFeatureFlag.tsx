"use client"

import "./AddFeatureFlag.scss"

import { Button, Form, Popover, Switch } from "antd"
import { LoadingOutlined } from "@ant-design/icons"
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
		departments,
		defaultDepartmentId,
		handleFormSubmit,
		isLoading,
		APIErrorMessage, setAPIErrorMessage,
	} = useAddFeatureFlag(organization)


	const addButtonContent = (
		<Form
			onValuesChange={(changed) => {
				if (changed?.name) {
					setAPIErrorMessage(prev => ({ ...prev, name: undefined }))
				}
				if (changed?.departmentId) {
					setAPIErrorMessage(prev => ({ ...prev, department: undefined }))
				}
			}}
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
								"Название обязательно",
						},
						{
							min: 1,
							message:
								"Длина названия фич флага должно быть больше 1",
						},
					]}
					help={APIErrorMessage?.name ?? null}
					validateStatus={APIErrorMessage?.name ? "error" : undefined}
				>
					<TextInput placeholder="Название фич флага" />
				</Form.Item>

				<Form.Item name="value" valuePropName="checked">
					<Switch checkedChildren="on" unCheckedChildren="off" />
				</Form.Item>
			</div>

			<Form.Item
				name="departmentId"
				rules={[
					{
						required: true,
						message: "Выберите отдел",
					},
				]}
				help={APIErrorMessage?.department ?? null}
				validateStatus={APIErrorMessage?.department ? "error" : undefined}
			>
				<SelectDepartmentSearchDropMenu
					placeholder="Отдел"
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
						loading={isLoading && { icon: <LoadingOutlined /> }}
					>
						{isLoading ? "Добавление..." : "Добавить"}
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
	)

	return (
		<div className="add-feature-flag">
			<Popover
				content={addButtonContent}
				autoAdjustOverflow
				placement="bottom"
				trigger="click"
			>
				<span>
					<AddButton />
				</span>
			</Popover >
		</div >
	)
}
