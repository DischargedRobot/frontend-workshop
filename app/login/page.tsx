import "./LoginPage.scss"

import { Content } from "antd/es/layout/layout"
import { LoginForm } from "@/features/LogInForm"

const Login = () => {
	return (
		<Content className="login">
			<h2>Авторизация</h2>
			<LoginForm />
		</Content>
	)
}
export default Login
