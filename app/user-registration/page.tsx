"use client"
import { UserRegistrationForm } from "@/features/UserRegistration"
import "./UserRegistration.scss"
import { Content } from "antd/es/layout/layout"
import { useSearchParams } from "next/navigation"

const UserRegistrationPage = () => {
	const searchParams = useSearchParams()
	const token = searchParams.get("token")
	return (
		<Content className="user-registration">
			<div className="user-registration__content">
				<h1>Регистрация</h1>
				<UserRegistrationForm token={token} />
			</div>
		</Content>
	)
}
export default UserRegistrationPage
