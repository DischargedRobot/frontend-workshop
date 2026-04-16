import { ReloadOutlined } from "@ant-design/icons"

import { IconButton } from "../IconButton"

interface Props {
	onClick: () => void
}

const ReloadButton = ({ onClick }: Props) => {
	return (
		<IconButton icon={<ReloadOutlined />} onClick={onClick}>
			Обновить
		</IconButton>
	)
}

export { ReloadButton }
