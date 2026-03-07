import { Content } from "antd/es/layout/layout";
import "./LoginPage.scss"

import LoginForm from "@/entities/LogInForm/LoginForm";
 
export default async function SignIn() {

    return (
        <Content className="login">
            <h2>Авторизация</h2>
            <LoginForm></LoginForm>
        </Content>
    )
}