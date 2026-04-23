import "./AddButton.scss"

import { MouseEvent } from "react"
import { PlusCircleOutlined } from "@ant-design/icons"

import { IconButton } from "../IconButton"

type Props = {
	children?: React.ReactNode
	type?: "button" | "submit" | "reset"
	onClick?: (e: MouseEvent<HTMLButtonElement>) => void
	disabled?: boolean
} & React.ButtonHTMLAttributes<HTMLButtonElement>

const AddButton = ({ type = "button", onClick, disabled, children, ...props }: Props) => {
	return (
		<IconButton
			{...props}
			icon={<PlusCircleOutlined />}
			className="add-button"
			type={type}
			onClick={onClick}
			disabled={disabled}
		>
			{children}
		</IconButton>
	)
}

export default AddButton
