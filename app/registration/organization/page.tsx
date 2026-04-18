import { OrganizationRegistrationForm } from "@/features/OrganizationRegistrationForm"
import "./RegistrationPage.scss"
import Link from "next/link"

import { Content } from "antd/es/layout/layout"
import { Button } from "antd"

const RegistrationPage = () => {
	return (
		<Content className="content registration">
			<div className="registration__content">
				<h2 className="title">Регистрация</h2>
				<OrganizationRegistrationForm />
			</div>
			<Link href="/login" style={{ width: "100%" }}>
				<Button className="form-button" type="primary">Войти</Button>
			</Link>
		</Content>
	)
}

export default RegistrationPage
