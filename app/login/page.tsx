import "./LoginPage.scss"

import { Content } from "antd/es/layout/layout"
import { LoginForm } from "@/features/LogInForm"
import Link from "next/link"
import { Button } from "antd"

const Login = () => {


	return (
		<><Content className="login">
			<div className="login__content">
				<h2>Авторизация</h2>
				<LoginForm />

				<div className="login__registeration">
					<h3 className="login__registeration__text text">Нет аккаунта?</h3>
					<Link href="/registration/organization">
						<Button type="default">Зарегистрироваться</Button>
					</Link>
				</div>
			</div>
		</Content>
			<div className="switch-auth-panel">
				<div className="switch-auth-panel__content">
					<h1 className="switch-auth-panel__title title">Добро пожаловать!</h1>
					<span className="switch-auth-panel__text text_litle">У Вас ещё нет организации?</span>
					<Link href="/auth">
						<Button type="default">Авторизация</Button>
					</Link>
				</div>
				<div className="switch-auth-panel__content">
					<h1 className="switch-auth-panel__title title ">Добро пожаловать домой!</h1>
					<span className="switch-auth-panel__text text text_litle">У Вас уже есть аккаунт?</span>
					<Link href="/registration/organization">
						<Button type="default">Регистрация</Button>
					</Link>
				</div>
			</div>
			<Content className="login">
				<div className="login__content">
					<h2>Авторизация</h2>
					<LoginForm />

					<div className="login__registeration">
						<h3 className="login__registeration__text text">Нет аккаунта?</h3>
						<Link href="/registration/organization">
							<Button type="default">Зарегистрироваться</Button>
						</Link>
					</div>
				</div>
			</Content>
		</>

	)
}
export default Login
