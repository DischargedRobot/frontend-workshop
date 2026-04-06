import { Button } from "antd"
import { LogoutOutlined } from "@ant-design/icons"

interface LogOutButtonProps {
	onClick?: () => void
	label?: string
}

export const LogOutButton = ({ onClick, label }: LogOutButtonProps) => {
	return (
		<Button danger icon={<LogoutOutlined />} type="text" onClick={onClick}>
			{label}
		</Button>
	)
}
