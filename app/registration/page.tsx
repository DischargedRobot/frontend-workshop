import "./RegistrationPage.scss"

import { Content } from "antd/es/layout/layout"
import { RegistrationForm } from "@/features/RegistraionForm"
import { useSearchParams } from "next/navigation"

const Registration = () => {
	return (
		<Content className="content registration">
			<div className="registration__content">
				<h2 className="title">Регистрация</h2>
				<RegistrationForm />
			</div>
		</Content>
	)
}

export default Registration
