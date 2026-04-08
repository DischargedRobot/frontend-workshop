import "./LoginPage.scss"

import { Content } from "antd/es/layout/layout"
import { LoginForm } from "@/features/LogInForm"

const Login = () => {
	return (
		<Content className="login">
			<div className="login__content">
				<h2>Авторизация</h2>
				<LoginForm />
			</div>
		</Content>
	)
}
export default Login
