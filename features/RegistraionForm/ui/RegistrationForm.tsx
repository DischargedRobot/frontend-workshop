"use client"

import { Button } from "antd"
import "./RegistrationForm.scss"

import { TextInput } from "@/shared/ui"
import { useRegistrationForm } from "../model"

export const RegistrationForm = () => {
	const { register, handleSubmit, errors, serverErrors, onSubmit } =
		useRegistrationForm()

	return (
		<form className="registration-table" onSubmit={handleSubmit(onSubmit)}>
			<div className="registration-table__item">
				<TextInput
					name="OrganisationName"
					placeholder="Название организация"
					register={register}
					error={serverErrors?.OrganisationName}
				/>
			</div>
			<div className="registration-table__items">
				<h3 className="title title_very-litle">
					Профиль администрации
				</h3>
				<TextInput
					placeholder="Логин"
					name="AdminName"
					register={register}
					error={serverErrors?.AdminName}
				/>
				<TextInput
					placeholder="Пароль"
					name="AdminPassword"
					type="password"
					rules={{
						minLength: {
							value: 6,
							message: "Размер пароля должен быть больше 6",
						},
						maxLength: {
							value: 25,
							message: "Размер пароля должен быть меньше 25",
						},
						required: "Это поле обязательно для заполнения",
					}}
					register={register}
					error={errors.AdminPassword?.message}
				/>
			</div>
			<Button htmlType="submit">Зарегистрироваться</Button>
		</form>
	)
}
