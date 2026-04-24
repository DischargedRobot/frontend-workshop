"use client"

import React from "react"
import { EditButton } from "@/shared/ui/EditButton"
import { showToast } from "@/shared/ui/Toast"

type Props = {
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
    isEditable: boolean
}

const ToggleEditable: React.FC<Props> = ({ onClick, isEditable }) => {
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        const next = !isEditable
        onClick(e)
        showToast({
            type: "inform",
            text: next ? "Включён режим редактирования" : "Выключен режим редактирования",
        })
    }

    return (
        <EditButton onClick={handleClick} />
    )
}

export default ToggleEditable
