import './RegistrationTable.scss'

export const RegistrationTable = () => {

    return (
        <div className="registration-table">
            <h2>Регистрация</h2>
            <div className="registraion-table__item">
                <h3>Организация</h3>
                <input type="text" />
            </div>
            <div className="registraion-table__item">
                <h3>Профиль администрации</h3>
                <input type="text" />
            </div>
        </div>
    )
}