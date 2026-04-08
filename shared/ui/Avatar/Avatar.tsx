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
				width={64}
				height={64}
			/>
			{leftButton && (
				<div className="avatar__button-left">{leftButton}</div>
			)}
			{rightButton && (
				<div className="avatar__button-right">{rightButton}</div>
			)}
		</div>
	)
}

export default memo(Avatar)
