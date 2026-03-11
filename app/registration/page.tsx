import { Content } from 'antd/es/layout/layout'
import './RegistrationPage.scss'

import { RegistrationForm } from "@/entities/RegistraionForm"

const Registration = async () => {
    return (
        <Content className="content registration">
            <div className="registration__content">
                <h2 className="title">Регистрация</h2>
                <RegistrationForm/>
            </div>
        </Content>
    )
}

export default Registration