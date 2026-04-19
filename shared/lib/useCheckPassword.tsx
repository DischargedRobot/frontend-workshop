import React, { useState, useCallback } from "react"

type PasswordChecks = {
    minLength: boolean
    hasNumber: boolean
    hasUpperCase: boolean
    hasLowerCase: boolean
    hasSpecialChar: boolean
}

const initialChecks: PasswordChecks = {
    minLength: false,
    hasNumber: false,
    hasUpperCase: false,
    hasLowerCase: false,
    hasSpecialChar: false,
}

function validatePassword(password: string): PasswordChecks {
    return {
        minLength: password.length >= 8,
        hasNumber: /\d/.test(password),
        hasUpperCase: /[A-Z]/.test(password),
        hasLowerCase: /[a-z]/.test(password),
        hasSpecialChar: /[!^-_&?]/.test(password),
    }
}

export function useCheckPassword() {
    const [checks, setChecks] = useState<PasswordChecks>(initialChecks)

    const validator = useCallback((password: string) => {
        const result = validatePassword(password)
        setChecks(result)
        return Object.values(result).every(Boolean)
    }, [])

    const PasswordChecksComponent = useCallback(
        () => (
            <ul>
                <li style={{ color: checks.minLength ? "green" : "red" }}>
                    Минимум 8 символов
                </li>
                <li style={{ color: checks.hasNumber ? "green" : "red" }}>
                    Содержит цифру
                </li>
                <li style={{ color: checks.hasUpperCase ? "green" : "red" }}>
                    Содержит заглавную букву
                </li>
                <li style={{ color: checks.hasLowerCase ? "green" : "red" }}>
                    Содержит строчную букву
                </li>
                <li style={{ color: checks.hasSpecialChar ? "green" : "red" }}>
                    Содержит специальный символ (!, ^, -, _, &, ?)
                </li>
            </ul>
        ),
        [checks],
    )

    return { validator, PasswordChecksComponent }
}
