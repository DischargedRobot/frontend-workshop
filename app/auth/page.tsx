"use client"

import "./AuthPage.scss"

import { useState } from "react"
import { Content } from "antd/es/layout/layout"
import { LoginForm } from "@/features/LogInForm"
import { Button } from "antd"
import { OrganizationRegistrationForm } from "@/features/OrganizationRegistrationForm"


type TVisiblePanel = "login" | "registration" | null

export default function AuthPage() {

    const [visiblePanel, setVisiblePanel] = useState<TVisiblePanel>("login")
    const [prevVisiblePanel, setPrevVisiblePanel] = useState<TVisiblePanel>(null)


    const handleSwitchPanel = (panel: TVisiblePanel) => {
        setIsAnimating(true)

        setPrevVisiblePanel(visiblePanel)
        setVisiblePanel(panel)
    }
    const [isAnimating, setIsAnimating] = useState(false)


    return (
        <Content className={`auth-page`}>
            {prevVisiblePanel && (
                <div
                    onAnimationEnd={() => {
                        setIsAnimating(false)
                        setPrevVisiblePanel(null)
                    }}
                    className={`auth-page__content ${isAnimating ? (prevVisiblePanel === "login" ? "fromLogin" : "fromRegistration") : ""}`} >
                    {renderAuth(prevVisiblePanel)}
                </div>
            )}
            <div className={`auth-page__content ${isAnimating ? (visiblePanel === "login" ? "toLogin" : "toRegistration") : ""}`} >
                {renderAuth(visiblePanel, handleSwitchPanel)}
            </div>
        </Content >
    )
}

const renderAuth = (key: TVisiblePanel, handleSwitchPanel?: (panel: TVisiblePanel) => void) => {
    switch (key) {
        case "login":
            return (
                <>
                    <div className="login">
                        <h2 className="title">Авторизация</h2>
                        <LoginForm />
                    </div>
                    <div className="switch-auth-panel login__switch">
                        <h1 className="switch-auth-panel__title title">Добро пожаловать!</h1>
                        <span className="switch-auth-panel__text text">У Вас ещё нет организации?</span>
                        <Button type="default" onClick={() => handleSwitchPanel && handleSwitchPanel("registration")}>Зарегистрировать</Button>
                    </div>
                </>
            )

        case "registration":
            return (
                <>
                    <div className="switch-auth-panel registration__switch">
                        <h1 className="switch-auth-panel__title title ">С возвращением!</h1>
                        <span className="switch-auth-panel__text text text">У Вас уже есть аккаунт?</span>
                        <Button type="default" onClick={() => handleSwitchPanel && handleSwitchPanel("login")}>Войти</Button>
                    </div>
                    <div className="registration">
                        <h2 className="title">Регистрация</h2>
                        <OrganizationRegistrationForm />
                    </div>
                </>)
        case null:
            return null
    }
}