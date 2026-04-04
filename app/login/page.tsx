import { Content } from "antd/es/layout/layout"
import "./LoginPage.scss"

import LoginForm from "@/entities/LogInForm/LoginForm"

const Login = () => {
	return (
		<Content className="login">
			<h2>Авторизация</h2>
			<LoginForm></LoginForm>
		</Content>
	)
}
export default Login
