'use client'

import './RegistrationForm.scss'

import AuthTextInput from '@/shared/AuthTextInput/AuthTextInput'
import { useRouter } from 'next/navigation'
import { ChangeEvent, use, useState } from 'react'
import { useForm } from 'react-hook-form'

export type checkPassword = (e: ChangeEvent<HTMLInputElement>) => boolean

export type FormValues = {
    OrganisationName: string
    AdminName: string
    AdminPassword: string
}

interface RegistrationError {
    OrganisationName?: string
    AdminName?: string
    AdminPassword?: string
}

export const RegistrationForm = () => {

    const router = useRouter()
    // const [user, setUser] = useState<string>()
    const { 
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>()

    const [serverErrors, setServerErrors] = useState<RegistrationError>()
    const  registration = async (data: FormValues) => {
        console.log('ref')
        const response = await fetch('/api/reg', {
            method: "POST",
            headers: {'Content-type': "aplication/json"},
            body: JSON.stringify({
                OrganisationName: data.OrganisationName,
                AdminName: data.AdminName,
                AdminPassword: data.AdminPassword
            }),
        })
        if (response.ok)  {
            router.push('/ffMenu')
        } else {
            const dataErrors: RegistrationError = (await response.json()).errors 
            setServerErrors(dataErrors as RegistrationError)
        }

    }

    return (
        <form className="registration-table" onSubmit={handleSubmit(registration)} >
            <h2>Регистрация</h2>
            <div className="registraion-table__item">
                <h3>Организация</h3>
                <AuthTextInput
                    name='OrganisationName'
                    placeholder='Name'
                    register = {register}
                    error={serverErrors?.OrganisationName}
                />
            </div>
            <div className="registraion-table__item">
                <h3>Профиль администрации</h3>
                <AuthTextInput
                    placeholder='Name'
                    name='AdminName'
                    type='login'
                    register = {register}
                    error = {serverErrors?.AdminName}
                />                
                <AuthTextInput
                    placeholder='Name'
                    name='AdminPassword'
                    type='password'
                    rules={{
                        minLength: {
                            value: 6,
                            message: "Размер пароля должен быть больше 6"
                        },
                        maxLength: {
                            value: 25,
                            message: "Размер пароля должен быть меньше 25"
                        },
                        required: "Это поле обязательно для заполнения",
                    }}
                    register = {register}
                    error = {errors.AdminPassword?.message}
                />
            </div>
            <button type='submit'>
                Зарегистрироваться
            </button>
        </form>
    )
}