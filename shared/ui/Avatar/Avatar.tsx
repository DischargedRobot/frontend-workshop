import Image from "next/image"

import "./Avatar.scss"
import img from "./furryAV.jpeg"
import { memo, ReactNode } from "react"

interface AvatarProps {
	leftButton?: ReactNode
	rightButton?: ReactNode
}

const Avatar = ({ leftButton, rightButton }: AvatarProps) => {
	return (
		<div className="avatar">
			<Image
				className="avatar__image"
				src={img}
				alt="Profile"
				width={100}
				height={100}
			/>
			{leftButton && <div className="avatar__button avatar__button_left">{leftButton}</div>}
			{rightButton && <div className="avatar__button avatar__button_right">{rightButton}</div>}
		</div>
	)
}

export default memo(Avatar)
