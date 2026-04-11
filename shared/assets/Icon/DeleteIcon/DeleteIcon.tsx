import Icon from "@ant-design/icons"
import { CustomIconComponentProps } from "@ant-design/icons/lib/components/Icon"
import { memo } from "react"



const CustomDeleteIcon: React.FC = () => {
	return (
		<svg
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M6 8H7.5M7.5 8H18M7.5 8V17.5C7.5 17.91 7.66 18.3 7.92 18.59C8.18 18.88 8.53 19 8.9 19H15.1C15.47 19 15.82 18.88 16.08 18.59C16.34 18.3 16.5 17.91 16.5 17.5V8M9 8V6.25C9 5.86 9.14 5.47 9.4 5.18C9.66 4.89 10 4.75 10.38 4.75H13.62C14 4.75 14.34 4.89 14.6 5.18C14.86 5.47 15 5.86 15 6.25V8M10.5 11.25V15.5M13.5 11.25V15.5"
				stroke="#F57474"
				strokeOpacity="0.8"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	)
}

const DeleteIcon: React.FC<Partial<CustomIconComponentProps>> = (props) => {
	return <Icon component={CustomDeleteIcon} {...props} />
}

export default memo(DeleteIcon)
