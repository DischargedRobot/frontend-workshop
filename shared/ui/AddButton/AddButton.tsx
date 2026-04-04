import "./AddButton.scss"

import { MouseEvent } from "react"
import { PlusCircleOutlined } from "@ant-design/icons"

type Props = {
	text?: string
	type?: "button" | "submit" | "reset"
	onClick?: (e: MouseEvent<HTMLButtonElement>) => void
}

const AddButton = ({ text = "", type = "button", onClick }: Props) => {
	return (
		<button
			className="add-button text text_litle text_tiny"
			type={type}
			onClick={onClick}
		>
			<PlusCircleOutlined />
			{text}
		</button>
	)
}

export default AddButton
