"use client"
import "./UserRegistrationForm.scss"

import { Button, Form } from "antd"
import { useRegistrationForm } from "../model"
import { TextInput } from "@/shared/ui"
import { memo } from "react"
import { useCheckPassword } from "@/shared/lib"
import { TextInputPassword } from "@/shared/ui/TextInput"

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

	const { validator: validatePassword, PasswordChecksComponent } = useCheckPassword()

	return (
		<Form
			validateTrigger="onBlur"
			className="user-registration-form"
			form={form}
			layout="vertical"
			onFinish={onSubmit}
			requiredMark={false}
		>

			<Form.Item
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
						pattern: /^[a-zA-Z0-9_-]+/,
						message:
							"Логин может содержать только буквы латинского алфавита, цифры, подчеркивание и дефис",
					},
				]}
			>
				<TextInput error={loginError} placeholder="Логин" />
			</Form.Item>
			<Form.Item
				validateTrigger="onChange"
				name="password"
				rules={[
					() => ({
						validator: (_, value) => {
							const ok = validatePassword(value || "")
							return ok
								? Promise.resolve()
								: Promise.reject(new Error("Пароль не соответствует требованиям"))
						},
					}),
				]}
				help={<PasswordChecksComponent />}
			>
				<TextInputPassword placeholder="Пароль" />
			</Form.Item>

			<Form.Item
				name="confirm"
				rules={[
					({ getFieldValue }) => ({
						validator: (_, value) => {
							const pass = getFieldValue("password")
							if (value !== pass) return Promise.reject(new Error("Пароли не совпадают"))
							const ok = validatePassword(value || "")
							return ok ? Promise.resolve() : Promise.reject(new Error("Пароль не соответствует требованиям"))
						},
					}),
				]}
			>
				<TextInputPassword placeholder="Подтверждение пароля" />
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
		</Form >
	)
}

export default memo(UserRegistrationForm)
