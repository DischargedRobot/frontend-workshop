"use client"

import { Button, Form, QRCode, Select, Tooltip, Typography, FormInstance, FormProps, SelectProps } from "antd"
import { SyncOutlined, CloseOutlined } from "@ant-design/icons"
import { memo } from "react"
import AddUserRoles from "./AddUserRoles"
import "./AddUser.scss"
import { IRole } from "@/shared/model/Role/types"

const { Paragraph } = Typography

interface Props {
    form: FormInstance
    url: string
    departmentOptions?: SelectProps['options']
    roles?: IRole[]
    onSubmit: FormProps['onFinish']
    onValuesChange?: FormProps['onValuesChange']
    onClose?: () => void
    handleRolesChange: (allRoles: IRole[], changedRole: IRole) => void
    handleReset: () => void
    isClean: boolean
    isNotFull: boolean
    isLoading: boolean
}

const AddUserForm = ({
    form,
    url,
    departmentOptions,
    roles,
    onSubmit,
    onValuesChange,
    onClose,
    handleRolesChange,
    handleReset,
    isClean,
    isNotFull,
    isLoading,
}: Props) => {
    return (
        <Form form={form} className="add-user" onFinish={onSubmit} onValuesChange={onValuesChange} initialValues={{ departmentUuid: null, roles: null }}>
            {onClose && (
                <div className="add-user__close">
                    <Button className="add-user__close-btn" onClick={onClose} type="text" icon={<CloseOutlined />} />
                </div>
            )}
            <div className="add-user__qr-code-container ">
                <QRCode className="qr-code" value={url} />

                <div className="add-user__token-container">
                    <Form.Item
                        className="add-user__search  text text_litle    "
                        name="departmentUuid"
                    >
                        <Select
                            className="add-user__search  text text_litle"
                            showSearch={{
                                optionFilterProp: "label"
                            }}
                            defaultActiveFirstOption={false}
                            options={departmentOptions}
                            placeholder="Выберите отдел"
                        />
                    </Form.Item>

                    <Tooltip title={url ? undefined : "Сначала получите ссылку"}>
                        <Paragraph
                            copyable={
                                !isNotFull
                                    ? false
                                    : {
                                        text: url,
                                        tooltips: [
                                            "Копировать",
                                            "Скопировано!",
                                        ],
                                    }
                            }
                            className="add-user__token  text text_litle"
                            style={
                                url.length != 0 ? { cursor: "pointer" } : {}
                            }
                            onClick={(e) => {
                                const copyIcon =
                                    e.currentTarget.querySelector(
                                        ".anticon-copy, .anticon-check",
                                    )
                                if (copyIcon instanceof HTMLElement) {
                                    copyIcon.click()
                                }
                            }}
                        >
                            <div className="url">{url}</div>
                        </Paragraph>
                    </Tooltip>

                    <div className="add-user__buttons">
                        <Button
                            className="add-user__add-button text text_litle"
                            disabled={!isNotFull}
                            type="primary"
                            htmlType="submit"
                            loading={isLoading && { icon: <SyncOutlined spin /> }}
                        >
                            {isNotFull ? "Получить ссылку" : "Выберите отдел и роли"}
                        </Button>
                        <Button
                            className="add-user__reset-button  text text_litle"
                            disabled={isClean}
                            htmlType="reset"
                            onClick={handleReset}
                        >
                            Сбросить
                        </Button>

                    </div>
                </div>
            </div>

            <Form.Item name="roles">
                <AddUserRoles
                    roles={roles}
                    onChange={handleRolesChange}
                />
            </Form.Item>
        </Form>
    )
}

export default memo(AddUserForm)
