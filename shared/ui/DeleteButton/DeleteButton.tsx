"use client"

import "./DeleteButton.scss"

import { DeleteIcon } from "@/shared/assets/Icon"
import { MouseEventHandler } from "react"

import { IconButton } from "../IconButton"

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	onClick?: MouseEventHandler<HTMLButtonElement>
	className?: string
	tooltip?: React.ReactNode
}

export const DeleteButton = ({ onClick, className = "", ...props }: Props) => {
	return (
		<IconButton
			{...props}
			icon={<DeleteIcon />}
			className={`delete-button ${className}`}
			onClick={onClick}
			tooltip={props.tooltip ?? "Удалить"}
		/>
	)
}
