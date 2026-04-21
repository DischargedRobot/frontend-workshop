import React, { useState, useCallback } from "react"

type PasswordChecks = {
    minLength: boolean | null
    hasNumber: boolean | null
    hasUpperCase: boolean | null
    hasLowerCase: boolean | null
    hasSpecialChar: boolean | null
}

const initialChecks: PasswordChecks = {
    minLength: null,
    hasNumber: null,
    hasUpperCase: null,
    hasLowerCase: null,
    hasSpecialChar: null,
}

function validatePassword(password: string): PasswordChecks {
    return {
        minLength: password.length >= 8,
        hasNumber: /\d/.test(password),
        hasUpperCase: /[A-Z]/.test(password),
        hasLowerCase: /[a-z]/.test(password),
        hasSpecialChar: /[!^\-_&?]/.test(password),
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
                <li style={{ color: checks.minLength === null ? "var(--text-description)" : checks.minLength ? "#2abd53" : "#ff4d4f" }}>
                    Минимум 8 символов
                </li>
                <li style={{ color: checks.hasNumber === null ? "var(--text-description)" : checks.hasNumber ? "#2abd53" : "#ff4d4f" }}>
                    Содержит цифру
                </li>
                <li style={{ color: checks.hasUpperCase === null ? "var(--text-description)" : checks.hasUpperCase ? "#2abd53" : "#ff4d4f" }}>
                    Содержит заглавную букву латинского алфавита
                </li>
                <li style={{ color: checks.hasLowerCase === null ? "var(--text-description)" : checks.hasLowerCase ? "#2abd53" : "#ff4d4f" }}>
                    Содержит строчную букву латинского алфавита
                </li>
                <li style={{ color: checks.hasSpecialChar === null ? "var(--text-description)" : checks.hasSpecialChar ? "#2abd53" : "#ff4d4f" }}>
                    Содержит специальный символ (!, ^, -, _, &, ?)
                </li>
            </ul>
        ),
        [checks],
    )

    return { validator, PasswordChecksComponent }
}
