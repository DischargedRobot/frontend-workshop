import { useState } from "react"
import { AddButton } from "@/shared/ui"
import "./RegistrationQrCode.scss"

import Text from "antd/es/typography/Text"
import { QRCodeSVG } from "qrcode.react"
import { message } from "antd"

export const RegistrationQrCode = ({ url }: { url: string }) => {
	const [isVisible, setIsVisible] = useState(false)

	const handleCopy = async (text: string) => {
		await navigator.clipboard.writeText(text)
	}

	return (
		<div className="registration-qr-code-wrapper">
			<AddButton onClick={() => setIsVisible((v) => !v)} />
			{isVisible && (
				<div className="registration-qr-code-container">
					<QRCodeSVG value={url} />
					<span
						className="registration-qr-code-container__url"
						onClick={() => handleCopy(url)}
					>
						{url}
					</span>
				</div>
			)}
		</div>
	)
}
