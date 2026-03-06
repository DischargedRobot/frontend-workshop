import LoginForm from "@/entities/LogInForm/LoginForm";
import { RegistrationForm } from "@/entities/RegistraionForm";

export default async function SignIn() {

    return (
        <div>
            <h2>Авторизация</h2>
            <LoginForm></LoginForm>
        </div>
    )
}