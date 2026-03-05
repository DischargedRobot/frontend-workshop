'use client'

import AuthTextInput from '@/shared/AuthTextInput/AuthTextInput'
import './RegistrationForm.scss'
import { ChangeEvent } from 'react'

export type checkPassword = (e: ChangeEvent<HTMLInputElement>) => boolean

export const RegistrationForm = () => {


    const checkPassword: checkPassword = (e) => {
        if (e.currentTarget.value.length>1){
            console.log('ss')
        }
        return false
    }

    return (
        <form className="registration-table" onSubmit={null}>
            <h2>Регистрация</h2>
            <div className="registraion-table__item">
                <h3>Организация</h3>
                <AuthTextInput
                    title='organisationName'
                    placeholder='Name'
                    name='organisationName'
                    onClick={null}
                />
            </div>
            <div className="registraion-table__item">
                <h3>Профиль администрации</h3>
                <AuthTextInput
                    title='adminName'
                    placeholder='Name'
                    name='adminName'
                    onClick={null}
                />                
                <AuthTextInput
                    title='adminPassword'
                    placeholder='Name'
                    name='adminPassword'
                    onClick={null}
                    onChange={checkPassword}
                />
            </div>
            <button>
                Зарегистрироваться
            </button>
        </form>
    )
}