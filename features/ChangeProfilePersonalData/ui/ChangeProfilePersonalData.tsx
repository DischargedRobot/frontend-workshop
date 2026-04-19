"use client"
import "./ChangeProfilePersonalData.scss"

import React, { useEffect, useRef, useState } from "react"
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
import { TextInputPassword } from "@/shared/ui/TextInput"

interface Props {
    onSave?: (data: ChangeProfilePersonalDataSave) => void
}

const ChangeProfilePersonalData = ({ onSave }: Props) => {
    const profileLogin = useProfileStore((state) => state.profile.login)
    const setProfileLogin = useProfileStore((state) => state.setLogin)
    const [form] = Form.useForm<ChangeProfilePersonalDataForm>()

    useEffect(() => {
        form.setFieldsValue({ login: profileLogin })

    }, [profileLogin, form])

    const { validator: validatePassword, PasswordChecksComponent } =
        useCheckPassword()

    const passwordWatcher = Form.useWatch("password", form)

    const handleAPIError = useAPIErrorHandler()

    const [isDirty, setIsDirty] = useState(false)
    const initialRef = useRef<Omit<ChangeProfilePersonalDataForm, "currentPassword" | "confirm"> | Record<string, string>>({})

    const handleFinish = async (values: ChangeProfilePersonalDataForm) => {
        const { login, password, currentPassword } = values

        try {
            await loginApi.patchMe({
                oldPassword: currentPassword,
                newLogin: login === profileLogin ? undefined : login,
                newPassword: password ? password : undefined,
            })

            if (login && login !== profileLogin) {
                setProfileLogin(login)
            }

            if (onSave) {
                onSave({ login, password })
            }

            initialRef.current = { login, password }
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
            onFinish={(values) => { console.log(values); handleFinish(values) }}
            autoComplete="off"
            requiredMark={false}
            onValuesChange={(_changed, all) => {
                const { currentPassword, ...withoutCurrentPassword } = all
                setIsDirty(JSON.stringify(withoutCurrentPassword) !== JSON.stringify(initialRef.current))

            }}
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
            <div className="change-profile-personal-form__content">
                <Form.Item
                    label="Логин"
                    name="login"
                >
                    {/* onBlur={() => markBlurred("login")} */}
                    <TextInput placeholder={profileLogin} />
                </Form.Item>

                <Form.Item
                    label="Текущий пароль"
                    name="currentPassword"
                    rules={[
                        {
                            required: true,
                            message: "Введите текущий пароль",
                        },
                    ]}
                >
                    <TextInputPassword autoComplete="off" type="password" placeholder="Текущий пароль" />
                </Form.Item>

                <Form.Item
                    label="Новый пароль"
                    name="password"
                    rules={[
                        {
                            validator: (_, value) => {
                                if (!value) return Promise.resolve()
                                const ok = validatePassword(value || "")
                                return ok ? Promise.resolve() : Promise.reject()
                            },
                        },
                    ]}
                    help={passwordWatcher ? <PasswordChecksComponent /> : undefined}
                >
                    <TextInputPassword placeholder="Оставьте пустым, чтобы не менять" />
                </Form.Item>

                <Form.Item
                    validateTrigger="onChange"
                    name="confirm"
                    label="Подтвердите пароль"
                    dependencies={["password"]}
                    rules={[{
                        required: !!form.getFieldValue("password"),
                        message: "Подтвердите новый пароль",
                    },
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
                    <TextInputPassword placeholder="Повторите пароль" />
                </Form.Item>
            </div>
            <Form.Item>
                <Button type="primary" htmlType="submit" {...(isDirty ? {} : { disabled: true })}>
                    Сохранить
                </Button>
            </Form.Item>
        </Form >
    )
}

export default ChangeProfilePersonalData
