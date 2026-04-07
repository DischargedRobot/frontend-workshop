import "./AddButton.scss"

import { MouseEvent } from "react"
import { PlusCircleOutlined } from "@ant-design/icons"

type Props = {
	children?: React.ReactNode
	type?: "button" | "submit" | "reset"
	onClick?: (e: MouseEvent<HTMLButtonElement>) => void
}

const AddButton = ({ type = "button", onClick, children }: Props) => {
	return (
		<button
			className="add-button text text_litle text_tiny"
			type={type}
			onClick={onClick}
		>
			<PlusCircleOutlined />
			{children}
		</button>
	)
}

export default AddButton
