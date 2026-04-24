import "./AddButton.scss"

import { MouseEvent } from "react"
import { PlusCircleOutlined } from "@ant-design/icons"

import { IconButton } from "../IconButton"

type Props = {
	children?: React.ReactNode
	type?: "button" | "submit" | "reset"
	onClick?: (e: MouseEvent<HTMLButtonElement>) => void
	disabled?: boolean
	tooltip?: React.ReactNode
} & React.ButtonHTMLAttributes<HTMLButtonElement>

const AddButton = ({ type = "button", onClick, disabled, children, ...props }: Props) => {
	return (
		<IconButton
			{...props}
			icon={<PlusCircleOutlined />}
			className="add-button"
			type={type}
			onClick={onClick}
			tooltip={disabled ? "Сначала создайте отдел" : props.tooltip ?? "Добавить пользователя"}
			disabled={disabled}
		>
			{children}
		</IconButton>
	)
}

export default AddButton
