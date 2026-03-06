'use client'
import AuthCheckBox from '@/shared/AuthCheckBox/AuthCheckBox'
import './LoginForm.scss'

import AuthTextInput from "@/shared/AuthTextInput/AuthTextInput"
import { redirect, RedirectType } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"

interface AuthForm {
    login: string
    password: string
}
// TODO:: уточнить у бека
interface ErrorAuth {
    message: string
}

const LoginForm = () => {

    const {register, handleSubmit} = useForm<AuthForm>()
    const [errorAuth, setErrorAuth] = useState<ErrorAuth>()

    const login = async (data: AuthForm) => {
        const response = await fetch ('/login', {
            method: 'POST',
            body: JSON.stringify({
                login: data.login,
                password: data.password
            })
        })

        const responseData = await response.json()

        if (!response.ok) {
            setErrorAuth(responseData.error)
        }
        
        redirect('/ffMenu', RedirectType.push)
    }


    return (
        <form className="authorisation-table" onSubmit={handleSubmit(login)} >
            {errorAuth && <span>{errorAuth.message}</span>}
            <div className="authorisation-table__item">
                <AuthTextInput
                    placeholder='Name'
                    name='login'
                    type='login'
                    register = {register}
                />                
                <AuthTextInput
                    placeholder='Name'
                    name='password'
                    type='password'
                    register = {register}
                />
            </div>
            <AuthCheckBox
                label='политика чего-то там'
                name='police'
            />
            <AuthCheckBox
                label='политика чего-то там'
                name='police'
            />
            <button type='submit' className='button'>
                Зарегистрироваться
            </button>
        </form>
    )
}

export default LoginForm