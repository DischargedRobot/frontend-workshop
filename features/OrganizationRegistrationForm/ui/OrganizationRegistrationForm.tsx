"use client"

import { Button, Form, Alert } from "antd"
import "./OrganizationRegistrationForm.scss"
import { useRouter } from "next/navigation"

import { useOrganizationRegistrationForm } from "../model"
import { TextInput } from "@/shared/ui"

interface RegistrationFormValues {
	OrganizationName: string
	AdminName: string
	AdminPassword: string
}

export const OrganizationRegistrationForm = () => {
	const [form] = Form.useForm<RegistrationFormValues>()
	const { onSubmit, loading, error } = useOrganizationRegistrationForm()
	const router = useRouter()

	return (
		<Form
			className="registration-table"
			form={form}
			layout="vertical"
			onFinish={onSubmit}
		>
			{error && (
				<Form.Item>
					<Alert
						title="Ошибка регистрации"
						description={error.message}
						type="error"
						showIcon
						closable
					/>
				</Form.Item>
			)}

			<Form.Item
				label="Название организации"
				name="OrganizationName"
				rules={[
					{
						required: true,
						message: "Введите название организации",
					},
				]}
			>
				<TextInput placeholder="Название организация" />
			</Form.Item>

			<div className="registration-table__items">
				<h3 className="title title_very-litle">
					Профиль администрации
				</h3>

				<Form.Item
					label="Логин"
					name="AdminName"
					rules={[
						{
							required: true,
							message: "Введите логин",
						},
					]}
				>
					<TextInput placeholder="Логин" />
				</Form.Item>

				<Form.Item
					label="Пароль"
					name="AdminPassword"
					rules={[
						{
							required: true,
							message: "Это поле обязательно для заполнения",
						},
						{
							min: 8,
							message: "Размер пароля должен быть больше 6",
						},
						{
							max: 25,
							message: "Размер пароля должен быть меньше 25",
						},
					]}
				>
					<TextInput type="password" placeholder="Пароль" />
				</Form.Item>
			</div>

			<div className="registration-table__buttons">

				<Button type="primary" htmlType="submit" loading={loading}>
					Зарегистрироваться
				</Button>
			</div>

		</Form>
	)
}
