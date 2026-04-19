import "./TextInput.scss"
import { InputHTMLAttributes, useState, ChangeEvent, memo } from "react"

type Props = InputHTMLAttributes<HTMLInputElement> & {
    label?: string
    error?: string
    className?: string
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

const TextInputPassword = (props: Props) => {
    const {
        label,
        error,
        className = "",
        onChange,
        value: externalValue,
        ...inputProps
    } = props

    const [internalValue, setInternalValue] = useState(externalValue ?? "")
    const [showPassword, setShowPassword] = useState(false)

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInternalValue(e.target.value)
        onChange?.(e)
    }

    return (
        <label className="text-filed text text_litle">
            {label && <span>{label}</span>}
            <>
                <input
                    className={`text-filed__input text-filed__input_password ${className}`}
                    {...inputProps}
                    value={internalValue}
                    onChange={handleChange}
                    type={showPassword ? "text" : "password"}
                />
                {(
                    <button
                        type="button"
                        className="text-filed__toggle"
                        onClick={() => setShowPassword((s) => !s)}
                        aria-label={showPassword ? "Скрыть пароль" : "Показать пароль"}
                    >
                        {showPassword ? (
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3 3L21 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M10.58 10.58A3 3 0 0113.42 13.42" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M9.88 5.05A10.94 10.94 0 003 12c2.5 4 6.5 7 9 7 1.6 0 3-.6 4.19-1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        ) : (
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 12S5 5 12 5s11 7 11 7-4 7-11 7S1 12 1 12z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        )}
                    </button>
                )}
            </>
            {error && <span className="error">{error}</span>}
        </label>
    )
}

export default memo(TextInputPassword)
