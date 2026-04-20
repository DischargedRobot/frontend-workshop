import "./LoginPage.scss"

import { Content } from "antd/es/layout/layout"
import { LoginForm } from "@/features/LogInForm"
import Link from "next/link"
import { Button } from "antd"

const Login = () => {


	return (
		<Content className="login">
			<div className="login__content">
				<h2>Авторизация</h2>
				<LoginForm />

				<div className="login__registeration">
					<span className="login__registeration__text text">Нет аккаунта?</span>
					<Link href="/registration/organization">
						<Button type="default">Зарегистрироваться</Button>
					</Link>
				</div>
			</div>
		</Content>
	)
}
export default Login
