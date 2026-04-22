"use client"

import { Button, Form } from "antd"
import "./OrganizationRegistrationForm.scss"
import { useOrganizationRegistrationForm } from "../model"
import { TextInput } from "@/shared/ui"
import { useCheckPassword } from "@/shared/lib"
import { TextInputPassword } from "@/shared/ui/TextInput"

export interface RegistrationFormValues {
	OrganizationName: string
	login: string
	password: string
}

export const OrganizationRegistrationForm = () => {
	const [form] = Form.useForm<RegistrationFormValues>()

	const { onSubmit, loading, error, clearFieldError } = useOrganizationRegistrationForm()

	const { validator: validatePassword, PasswordChecksComponent } = useCheckPassword()
	const passwordWatcher = Form.useWatch("password", form)


	return (
		<Form
			className="registration-table"
			form={form}
			autoComplete="off"
			layout="vertical"
			onFinish={onSubmit}
			onValuesChange={(changedValues) => {
				if (changedValues?.login) {
					clearFieldError("login", changedValues.login)
				}
				if (changedValues?.OrganizationName) {
					clearFieldError("organization", changedValues.OrganizationName)
				}
			}}
			requiredMark={false}
		>
			<div className="registration-table__content">
				<Form.Item
					// label="Название организации"
					name="OrganizationName"
					rules={[
						{
							required: true,
							message: "Введите название организации",
						},
					]}
					help={<span className="error-message">{error?.organization}</span>}
				>
					<TextInput placeholder="Название организация" />
				</Form.Item>

				<div className="registration-table__admin">
					<h3 className="title title_very-litle">
						Профиль администрации
					</h3>
					<div className="admin">
						<div className="admin__content">
							<Form.Item
								// label="Логин"
								name="login"
								rules={[
									{
										required: true,
										message: "Введите логин",
									},
								]}
								help={<span className="error-message">{error?.login}</span>}

							>
								<TextInput placeholder="Логин" />
							</Form.Item>
							<Form.Item
								validateTrigger="onChange"
								// label="Пароль"
								name="password"
								rules={[
									{
										validator: (_, value) => {
											const ok = validatePassword(value || "")
											return ok ? Promise.resolve() : Promise.reject()
										}
									}
								]}
								extra={<PasswordChecksComponent />}
							>
								<TextInputPassword placeholder="Пароль" />
							</Form.Item>
						</div>

						<Form.Item
							// label="Подтверждение пароля"
							name="confirm"
							dependencies={["password"]}
							rules={[
								({ getFieldValue }) => ({
									validator(_, value) {
										if (!value || getFieldValue("password") === value) {
											return Promise.resolve()
										}
										return Promise.reject(new Error("Пароли не совпадают"))
									}
								})
							]}
						>
							<TextInputPassword placeholder="Подтверждение пароля" />
						</Form.Item>
					</div>
				</div>
			</div>

			<Button
				className="form-button"
				type="default"
				htmlType="submit"
				loading={loading}
			>
				{loading ? "Регистрация..." : "Зарегистрировать"}
			</Button>

		</Form>
	)
}
