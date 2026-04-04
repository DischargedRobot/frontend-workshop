import "./CollapsedIcon.scss"
import { RightOutlined } from "@ant-design/icons"

interface Props {
	isCollapsed: boolean
}

const CollapsedIcon = (props: Props) => {
	const { isCollapsed } = props

	return (
		<RightOutlined
			className="collapsed-icon"
			style={isCollapsed ? { rotate: "180deg" } : {}}
		/>
	)
}

export default CollapsedIcon
