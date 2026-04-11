import "./AddButton.scss"

import { MouseEvent } from "react"
import { PlusCircleOutlined } from "@ant-design/icons"

type Props = {
	children?: React.ReactNode
	type?: "button" | "submit" | "reset"
	onClick?: (e: MouseEvent<HTMLButtonElement>) => void
	disabled?: boolean
}

const AddButton = ({ type = "button", onClick, disabled, children }: Props) => {
	return (
		<button
			className={`add-button text text_litle text_tiny ${disabled ? "disabled" : ""}`}
			type={type}
			onClick={onClick}
			disabled={disabled}
		>
			<PlusCircleOutlined />
			{children}
		</button>
	)
}

export default AddButton
