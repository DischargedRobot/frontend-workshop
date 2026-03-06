import './AuthTextInput.scss'

import {  UseFormRegister, FieldValues,RegisterOptions, Path } from 'react-hook-form'

type Props<T extends FieldValues> = {
    type?: string
    placeholder: string
    name: Path<T>
    register: UseFormRegister<T>
    rules?: RegisterOptions<T>
    error?: string
}

const AuthTextInput = <T extends FieldValues>(props: Props<T>) => {

    const {
        placeholder,
        name,
        rules,
        register,
        error,
    } = props

    return(
        <label className="auth-text-filed text">
            <input type="text" className='auth-text-filed__input' placeholder={placeholder} {...register(name, rules)}/>
            {error}
        </label>
    )
}

export default AuthTextInput