import { OrganizationRegistrationForm } from "@/features/OrganizationRegistrationForm"
import "./RegistrationPage.scss"
import Link from "next/link"

import { Content } from "antd/es/layout/layout"
import { Button } from "antd"

const Registration = () => {
	return (
		<Content className="content registration">
			<div className="registration__content">
				<h2 className="title">Регистрация</h2>
				<OrganizationRegistrationForm />

				<div className="registration__login">
					<span className="registration__login__text  text">Уже есть аккаунт?</span>
					<Link href="/login">
						<Button type="default">Войти</Button>
					</Link>
				</div>
			</div>
		</Content>
	)
}

export default Registration
