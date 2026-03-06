import './RegistrationPage.scss'

import { RegistrationForm } from "@/entities/RegistraionForm"

const Registration = async () => {
    return (
        <main className="content registration">
            <div className="registration__content">
                <h2 className="title">Регистрация</h2>
                <RegistrationForm/>
            </div>
        </main>
    )
}

export default Registration