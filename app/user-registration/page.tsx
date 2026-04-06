"use client"
import { UserRegistrationForm } from "@/features/UserRegistration"
import "./UserRegistration.scss"
import { Content } from "antd/es/layout/layout"

export default function UserRegistrationPage() {
	return (
		<Content className="user-registration">
			<div className="user-registration__content">
				<h1>Регистрация</h1>
				<UserRegistrationForm />
			</div>
		</Content>
	)
}
