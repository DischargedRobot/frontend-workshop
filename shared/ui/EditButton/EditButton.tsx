"use client"

import { IconButton } from "../IconButton/IconButton"
import React from "react"
import { EditOutlined } from "@ant-design/icons"

type Props = {
    value?: string
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
    className?: string
    title?: string
}

export const EditButton = ({ value, onClick, className, title }: Props) => {
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        onClick?.(e)
    }

    return (
        <IconButton
            icon={<EditOutlined />}
            onClick={handleClick}
            className={className}
            title={title ?? "Редактировать"}
        >
            {value ? <span className="edit-button__label">{value}</span> : null}
        </IconButton>
    )
}

export default EditButton
