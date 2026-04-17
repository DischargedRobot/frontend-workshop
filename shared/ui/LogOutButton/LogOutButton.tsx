import { LogoutOutlined } from "@ant-design/icons"
import { IconButton } from "../IconButton"
import "./LogOutButton.scss"

interface LogOutButtonProps {
	onClick?: () => void
	label?: string
}

export const LogOutButton = ({ onClick, label }: LogOutButtonProps) => {
	return (
		<IconButton icon={<LogoutOutlined />} onClick={onClick} className="log-out-button">
			{label}
		</IconButton>
	)
}
