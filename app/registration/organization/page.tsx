import { OrganizationRegistrationForm } from "@/features/OrganizationRegistrationForm"
import "./RegistrationPage.scss"
import Link from "next/link"
import { Button } from "antd"

const RegistrationPage = () => {
	return (
		<div className="content registration">
			<div className="registration__content">
				<OrganizationRegistrationForm />
			</div>
			<Link href="/login" style={{ width: "100%" }}>
				<Button className="form-button" type="primary">Войти</Button>
			</Link>
		</div>
	)
}

export default RegistrationPage
