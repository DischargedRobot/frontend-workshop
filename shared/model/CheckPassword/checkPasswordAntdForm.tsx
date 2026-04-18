import "./CheckPasswordAntdForm.scss"

export const checkPasswordAntdForm = (password: string) => {
	const errors: string[] = []
	if (!password) {
		return Promise.reject(new Error("Это поле обязательно для заполнения"))
	}
	if (password.length < 8) {
		errors.push("8 символов")
	}
	if (!/[a-zа-я]/.test(password)) {
		errors.push("минимум одну строчную букву")
	}
	if (!/[A-ZА-Я]/.test(password)) {
		errors.push("минимум одну заглавную букву")
	}
	if (!/\d/.test(password)) {
		errors.push("минимум одну цифру")
	}
	if (errors.length) {
		return Promise.reject(
			<>
				<h3>
					Пароль должен иметь:
				</h3>
				<ul className="check-password-errors">
					{errors.map((error, index) => <li key={index}>{error}</li>)}
				</ul>
			</>
		)
	}
	return Promise.resolve()
}
