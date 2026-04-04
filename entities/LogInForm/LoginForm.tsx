"use client"
import "./LoginForm.scss"

import { Button, Form, Input } from "antd"

import { redirect, RedirectType } from "next/navigation"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"

interface AuthForm {
	login: string
	password: string
}
// TODO:: уточнить у бека
interface ErrorAuth {
	message: string
}

const LoginForm = () => {
	const {
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<AuthForm>()
	const [errorAuth, setErrorAuth] = useState<ErrorAuth>()

	const login = async (data: AuthForm) => {
		const response = await fetch("/login", {
			method: "POST",
			body: JSON.stringify({
				login: data.login,
				password: data.password,
			}),
		})
		console.log(data)
		const responseData = await response.json()

		if (!response.ok) {
			setErrorAuth(responseData.error)
		}

		redirect("/ffMenu", RedirectType.push)
	}

	// const login = async (e: React.FormEvent<HTMLFormElement>) => {
	//     e.preventDefault();
	//     // const response = await fetch ('/login', {
	//     //     method: 'POST',
	//     //     body: JSON.stringify({
	//     //         login: data.login,
	//     //         password: data.password
	//     //     })
	//     // })
	//     // const responseData = await response.json()

	//     // if (!response.ok) {
	//     //     setErrorAuth(responseData.error)
	//     // }

	//     // redirect('/ffMenu', RedirectType.push)
	// }
	return (
		<Form className="authorisation-table" onFinish={handleSubmit(login)}>
			{errorAuth && <span>{errorAuth.message}</span>}
			<Form.Item
				layout="vertical"
				label="Логин"
				validateStatus={errors.login ? "error" : ""}
				help={errors.login ? errors.login.message : ""}
			>
				<Controller
					control={control}
					name="login"
					rules={{
						required: "Введите логин",
					}}
					render={({ field }) => (
						<Input placeholder="Логин" {...field} />
					)}
				/>
			</Form.Item>
			<Form.Item
				layout="vertical"
				label="Пароль"
				validateStatus={errors.password ? "error" : ""}
				help={errors.password ? errors.password.message : ""}
			>
				<Controller
					control={control}
					name="password"
					rules={{
						required: "Введите пароль",
					}}
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
