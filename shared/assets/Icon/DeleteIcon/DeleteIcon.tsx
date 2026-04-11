import Icon from "@ant-design/icons"
import { CustomIconComponentProps } from "@ant-design/icons/lib/components/Icon"
import { memo } from "react"



const CustomDeleteIcon: React.FC = () => {
	return (
		<svg width="1em" height="1em" viewBox="0 0 19 21" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M0.700195 4.53353H2.61686M2.61686 4.53353H17.9502M2.61686 4.53353L2.61686 17.9502C2.61686 18.4585 2.8188 18.946 3.17824 19.3055C3.53769 19.6649 4.0252 19.8669 4.53353 19.8669H14.1169C14.6252 19.8669 15.1127 19.6649 15.4721 19.3055C15.8316 18.946 16.0335 18.4585 16.0335 17.9502V4.53353M5.49186 4.53353V2.61686C5.49186 2.10853 5.6938 1.62102 6.05324 1.26157C6.41269 0.902129 6.9002 0.700195 7.40853 0.700195H11.2419C11.7502 0.700195 12.2377 0.902129 12.5971 1.26157C12.9566 1.62102 13.1585 2.10853 13.1585 2.61686V4.53353M7.40853 9.3252V15.0752M11.2419 9.3252V15.0752" stroke="#F57474" strokeOpacity="0.8" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
		</svg>

	)
}

const DeleteIcon: React.FC<Partial<CustomIconComponentProps>> = (props) => {
	return <Icon component={CustomDeleteIcon} {...props} />
}

export default memo(DeleteIcon)
