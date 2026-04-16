"use client"

import "./DeleteButton.scss"

import { DeleteIcon } from "@/shared/assets/Icon"
import { MouseEventHandler } from "react"

import { IconButton } from "../IconButton"

interface Props {
	onClick?: MouseEventHandler<HTMLButtonElement>
	className?: string
}

export const DeleteButton = ({ onClick, className = "" }: Props) => {
	return (
		<IconButton icon={<DeleteIcon />} className={`delete-button ${className}`} onClick={onClick} />
	)
}
