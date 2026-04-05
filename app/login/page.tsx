import { Content } from "antd/es/layout/layout"
import "./LoginPage.scss"

import { LoginForm } from "@/entities/LogInForm"

const Login = () => {
	return (
		<Content className="login">
			<h2>Авторизация</h2>
			<LoginForm />
		</Content>
	)
}
export default Login
