"use client"

import "./LoginForm.scss"

import { useLoginForm } from "../model"
import { Button, Form, Input } from "antd"
import { TextInput } from "@/shared/ui"

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
		>
			{errorAuth && (
				<span className="error-message">{errorAuth.message}</span>
			)}
			<Form.Item
				label="Логин"
				name="login"
				rules={[{ required: true, message: "Введите логин" }]}
			>
				<TextInput placeholder="Логин" />
			</Form.Item>
			<Form.Item
				label="Пароль"
				name="password"
				rules={[{ required: true, message: "Введите пароль" }]}
			>
				<TextInput type="password" placeholder="Пароль" />
			</Form.Item>
			<div className="authorisation-table__buttons">
				<Button htmlType="submit" loading={loading}>
					Войти
				</Button>
			</div>
		</Form>
	)
}
