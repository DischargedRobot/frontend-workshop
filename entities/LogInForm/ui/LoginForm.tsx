"use client"
import "./LoginForm.scss"

import { Button, Form, Input } from "antd"
import { Controller } from "react-hook-form"
import { useLoginForm } from "../model"

const LoginForm = () => {
	const { onSubmit, control, errors, errorAuth } = useLoginForm()

	return (
		<Form className="authorisation-table" onFinish={onSubmit}>
			{errorAuth && <span>{errorAuth.message}</span>}
			<Form.Item
				layout="vertical"
				label="Логин"
				validateStatus={errors.login ? "error" : ""}
				help={errors.login?.message}
			>
				<Controller
					control={control}
					name="login"
					rules={{ required: "Введите логин" }}
					render={({ field }) => (
						<Input placeholder="Логин" {...field} />
					)}
				/>
			</Form.Item>
			<Form.Item
				layout="vertical"
				label="Пароль"
				validateStatus={errors.password ? "error" : ""}
				help={errors.password?.message}
			>
				<Controller
					control={control}
					name="password"
					rules={{ required: "Введите пароль" }}
					render={({ field }) => (
						<Input placeholder="Пароль" {...field} />
					)}
				/>
			</Form.Item>
			<Button htmlType="submit">Войти</Button>
		</Form>
	)
}

export default LoginForm
