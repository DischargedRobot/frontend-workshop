"use client"

import "./DeleteButton.scss"

import { DeleteIcon } from "@/shared/assets/Icon"
import { MouseEventHandler } from "react"

interface Props {
	onClick?: MouseEventHandler<HTMLButtonElement>
	className?: string
}

export const DeleteButton = ({ onClick, className }: Props) => {
	return (
		<button className={`delet-button ${className}`} onClick={onClick}>
			<DeleteIcon />
		</button>
	)
}
