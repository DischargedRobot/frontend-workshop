"use client"
import "./ChangeProfilePersonalData.scss"

import React, { useEffect, useState } from "react"
import { Form, Input, Button, message } from "antd"
import Avatar from "@/shared/ui/Avatar"
import { useProfileStore } from "@/entities/Profile"
import { loginApi } from "@/shared/api"
import { useAPIErrorHandler } from "@/shared/api/APIErrorHandler"
import type {
    ChangeProfilePersonalDataForm,
    ChangeProfilePersonalDataSave,
} from "../types"
import { showToast, TextInput } from "@/shared/ui"
import { useCheckPassword } from "@/shared/lib"

interface Props {
    onSave?: (data: ChangeProfilePersonalDataSave) => void
}

const ChangeProfilePersonalData = ({ onSave }: Props) => {
    const profile = useProfileStore((state) => state.profile)
    const setLogin = useProfileStore((state) => state.setLogin)
    const setPassword = useProfileStore((state) => state.setPassword)

    const [form] = Form.useForm<ChangeProfilePersonalDataForm>()
    // const [blurredFields, setBlurredFields] = useState<Record<string, boolean>>({})

    // const markBlurred = (name: keyof Omit<ChangeProfilePersonalDataForm, "currentPassword">) => {
    //     if (blurredFields[name]) return
    //     setBlurredFields((prev) => ({ ...(prev || {}), [name]: true }))
    //     // run validation on blur so messages appear
    //     form.validateFields([name]).catch(() => { })
    // }

    useEffect(() => {
        form.setFieldsValue({ login: profile.login })
    }, [profile.login, form])

    // const onValuesChange = (changedValues: Partial<ChangeProfilePersonalDataForm>, allValues: ChangeProfilePersonalDataForm) => {
    //     const changedKey = Object.keys(changedValues)[0] as keyof ChangeProfilePersonalDataForm | undefined
    //     if (!changedKey) return

    //     const isBlurred = !!blurredFields[changedKey as string]
    //     if (!isBlurred) return // don't show/clear errors until first blur

    //     // как только пользователь вводит после того, как поле было валидационно потрогано (blur), скрываем ошибки
    //     form.setFields([{ name: changedKey, errors: [] }])

    //     if (changedKey === "password") {
    //         const confirmErrors = form.getFieldError("confirm")
    //         if (confirmErrors.length && allValues.confirm && allValues.confirm === allValues.password) {
    //             form.setFields([{ name: "confirm", errors: [] }])
    //         }
    //     }
    // }

    const { validator: validatePassword, PasswordChecksComponent } =
        useCheckPassword()

    const handleAPIError = useAPIErrorHandler()

    const handleFinish = async (values: ChangeProfilePersonalDataForm) => {
        const { login, password, currentPassword } = values

        try {
            await loginApi.patchMe({
                oldPassword: currentPassword,
                newLogin: login,
                newPassword: password || "",
            })

            if (login && login !== profile.login) {
                setLogin(login)
            }

            if (password) {
                setPassword(password)
            }

            if (onSave) {
                onSave({ login, password })
            }

            showToast({ type: "success", text: "Данные сохранены" })
        } catch (err) {
            handleAPIError(err as Error)
        }
    }
    //  onBlur={() => markBlurred("currentPassword")}
    return (
        <Form
            // onValuesChange={onValuesChange}
            className="change-profile-personal-form"
            form={form}
            layout="vertical"
            onFinish={handleFinish}
            autoComplete="off"
            requiredMark={false}
        >
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: 16,
                }}
            >
                <Avatar size={80} />
            </div>
            <Form.Item
                label="Логин"
                name="login"
                rules={[{ required: true, message: "Введите логин" }]}
            >
                {/* onBlur={() => markBlurred("login")} */}
                <TextInput />
            </Form.Item>

            <Form.Item
                label="Текущий пароль"
                name="currentPasswordBrauzerZae"
                rules={[
                    {
                        required: true,
                        message: "Введите текущий пароль",
                    },
                ]}
            >
                <TextInput type="password" placeholder="Текущий пароль" />
            </Form.Item>

            <Form.Item
                validateTrigger="onChange"
                label="Новый пароль"
                name="password"
                rules={[
                    {
                        validator: (_, value) => {
                            const ok = validatePassword(value || "")
                            return ok
                                ? Promise.resolve()
                                : Promise.reject()
                        },
                    },
                ]}
                help={<PasswordChecksComponent />}
            >
                <TextInput
                    type="password"
                    placeholder="Оставьте пустым, чтобы не менять"
                />
            </Form.Item>

            <Form.Item
                validateTrigger="onChange"

                name="confirm"
                label="Подтвердите пароль"
                dependencies={["password"]}
                rules={[
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            const pass = getFieldValue("password")
                            if (!pass && !value) {
                                return Promise.resolve()
                            }
                            if (value === pass) {
                                return Promise.resolve()
                            }
                            return Promise.reject(
                                new Error("Пароли не совпадают"),
                            )
                        },
                    }),
                ]}
            >
                <TextInput placeholder="Повторите пароль" />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Сохранить
                </Button>
            </Form.Item>
        </Form>
    )
}

export default ChangeProfilePersonalData
