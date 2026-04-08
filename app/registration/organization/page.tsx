import { OrganizationRegistrationForm } from "@/features/OrganizationRegistrationForm"
import "./RegistrationPage.scss"

import { Content } from "antd/es/layout/layout"

const Registration = () => {
	return (
		<Content className="content registration">
			<div className="registration__content">
				<h2 className="title">Регистрация</h2>
				<OrganizationRegistrationForm />
			</div>
		</Content>
	)
}

export default Registration
