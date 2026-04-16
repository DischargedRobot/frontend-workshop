import "./IconButton.scss"

import { MouseEvent, ReactNode } from "react"

interface Props {
	icon: ReactNode
	children?: ReactNode
	onClick?: (e: MouseEvent<HTMLButtonElement>) => void
	type?: "button" | "submit" | "reset"
	disabled?: boolean
	className?: string
}

const IconButton = ({
	icon,
	children,
	onClick,
	type = "button",
	disabled = false,
	className = "",
}: Props) => {
	return (
		<button
			className={`icon-button text text_litle text_tiny ${disabled ? "disabled" : ""} ${className}`}
			type={type}
			onClick={onClick}
			disabled={disabled}
		>
			{icon}
			{children}
		</button>
	)
}

export { IconButton }
