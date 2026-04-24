import "./IconButton.scss"

import { MouseEvent, ReactNode } from "react"
import { Tooltip } from "antd"

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	icon: ReactNode
	tooltip?: ReactNode
	children?: ReactNode
	onClick?: (e: MouseEvent<HTMLButtonElement>) => void
	type?: "button" | "submit" | "reset"
	disabled?: boolean
	className?: string
}

const IconButton = ({
	icon,
	tooltip,
	children,
	onClick,
	type = "button",
	disabled = false,
	className = "",
	...otherProps
}: Props) => {
	const button = (
		<button
			className={`icon-button text text_litle text_tiny ${disabled ? "disabled" : ""} ${className}`}
			type={type}
			onClick={onClick}
			disabled={disabled}
			aria-label={typeof tooltip === "string" ? tooltip : undefined}
			{...otherProps}
		>
			{icon}
			{children}
		</button>
	)

	return tooltip ? <Tooltip title={tooltip}>{button}</Tooltip> : button
}

export { IconButton }
