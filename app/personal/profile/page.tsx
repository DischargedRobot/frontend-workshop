"use client"

import { ChangeProfileMenu } from "@/features/ChangeProfilePanel"
import "./Profile.scss"

import { ProfileContainer } from "@/widgets/ProfileContainer"
import { ProfileSettings } from "@/features/ProfileSettings"
import { Content } from "antd/es/layout/layout"
import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { Profile } from "@/entities/Profile"

const ProfilePage = () => {

	const pathname = usePathname()

	const order = ['profile', 'changePassword', 'theme']

	const [currentPanel, setCurrentPanel] = useState('profile')
	const [prevPanel, setPrevPanel] = useState<string | null>(null)
	const [direction, setDirection] = useState<'left' | 'right'>('left')
	const [isAnimating, setIsAnimating] = useState(false)

	const handleSelect = (key: string) => {
		if (key === currentPanel) return
		const newDirection = order.indexOf(key) > order.indexOf(currentPanel) ? 'left' : 'right'
		setPrevPanel(currentPanel)
		setDirection(newDirection)
		setCurrentPanel(key)
		setIsAnimating(true)
	}


	const animationContainer = useRef<HTMLDivElement>(null)
	useEffect(() => {
		const handleAnimationEnd = () => {
			setIsAnimating(false)
			setPrevPanel(null)
			console.log('Animation ended, current panel:', currentPanel, 'isAnimating:', isAnimating)
		}
		const container = animationContainer.current
		console.log('Animation ended,', container, 'current panel:', currentPanel, 'isAnimating:', isAnimating)

		if (!container) return
		container.addEventListener('animationend', handleAnimationEnd)
		return () => {
			container.removeEventListener('animationend', handleAnimationEnd)
		}

	}, [animationContainer])

	return (
		<Content className="profile-page">
			<ChangeProfileMenu selectedKey={currentPanel} onSelect={handleSelect} />

			<div className="profile-panel-area" >
				{prevPanel && (
					<div
						onAnimationEnd={() => {
							setIsAnimating(false)
							setPrevPanel(null)
							console.log('Animation ended, current panel:', currentPanel, 'isAnimating:', isAnimating)
						}}
						ref={animationContainer}
						className={`panel ${isAnimating ? (direction === 'left' ? 'animate-exit-left' : 'animate-exit-right') : ''}`}
					>
						{renderPanel(prevPanel)}
					</div>
				)}

				<div
					className={`panel ${isAnimating ? (direction === 'left' ? 'animate-enter-from-right' : 'animate-enter-from-left') : ''}`}
				>
					{renderPanel(currentPanel)}
				</div>
			</div>
		</Content >
	)
}


export default ProfilePage

function renderPanel(key: string | null) {
	if (!key) return null
	switch (key) {
		case 'profile':
			return <ProfileContainer />
		case 'changePassword':
			return <div style={{ padding: 20 }}>Форма смены пароля (заглушка)</div>
		case 'theme':
			return <ProfileSettings />
		default:
			return null
	}
}
