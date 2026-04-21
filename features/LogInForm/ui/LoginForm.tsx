"use client"

import "./LoginForm.scss"

import { useLoginForm } from "../model"
import { Button, Form } from "antd"
import { TextInput } from "@/shared/ui"
import { TextInputPassword } from "@/shared/ui/TextInput"

interface LoginFormValues {
	login: string
	password: string
}

export const LoginForm = () => {
	const [form] = Form.useForm<LoginFormValues>()
	const { onSubmit, loading, errorAuth } = useLoginForm()

	return (
		<Form
			className="authorisation-table"
			form={form}
			layout="vertical"
			onFinish={onSubmit}
			requiredMark={false}
		>
			{errorAuth && (
				<span className="error-message">{errorAuth.message}</span>
			)}
			<Form.Item

				name="login"
				rules={[{ required: true, message: "Введите логин" }]}
			>
				<TextInput placeholder="Логин" />
			</Form.Item>
			<Form.Item

				name="password"
				rules={[{ required: true, message: "Введите пароль" }]}
			>
				<TextInputPassword placeholder="Пароль" />
			</Form.Item>
			<Button
				type="default"
				htmlType="submit"
				className="form-button"
				loading={loading}
			>
				Войти
			</Button>
		</Form>
	)
}
