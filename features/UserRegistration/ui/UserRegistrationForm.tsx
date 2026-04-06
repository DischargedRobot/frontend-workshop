"use client"
import "./UserRegistrationForm.scss"

import { Button, Form, Alert } from "antd"
import { useRegistrationForm } from "../model"
import { TextInput } from "@/shared/ui"
import { error } from "console"
import { memo } from "react"

interface RegistrationForm {
	login: string
	password: string
}

interface Props {
	token: string
}

const UserRegistrationForm = ({ token }: Props) => {
	const [form] = Form.useForm<RegistrationForm>()
	const { onSubmit, loading, loginError } = useRegistrationForm(token)

	return (
		<Form
			className="user-registration-form"
			form={form}
			layout="vertical"
			onFinish={onSubmit}
		>
			{/* {loginError && (
				<Form.Item>
					<Alert
						title="Ошибка регистрации"
						description={error.message}
						type="error"
						showIcon
						closable
					/>
				</Form.Item>
			)} */}

			<Form.Item
				label="Логин"
				name="login"
				rules={[
					{
						required: true,
						message: "Введите логин",
					},
					{
						min: 3,
						message: "Логин должен быть не менее 3 символов",
					},
					{
						pattern: /^[a-zA-Z0-9_-]+$/,
						message:
							"Логин может содержать только буквы латинского алфавита, цифры, подчеркивание и дефис",
					},
				]}
			>
				<TextInput error={loginError} placeholder="Логин" />
			</Form.Item>

			<Form.Item
				label="Пароль"
				name="password"
				rules={[
					{
						required: true,
						message: "Введите пароль",
					},
					{
						min: 8,
						message: "Пароль должен быть не менее 8 символов",
					},
					{
						pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
						message:
							"Пароль должен содержать заглавные буквы, строчные буквы и цифры",
					},
				]}
			>
				<TextInput type="password" placeholder="Пароль" />
			</Form.Item>

			<Button
				type="primary"
				htmlType="submit"
				loading={loading}
				block
				size="large"
			>
				Зарегистрироваться
			</Button>
		</Form>
	)
}

export default memo(UserRegistrationForm)
