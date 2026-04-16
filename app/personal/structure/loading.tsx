import React from "react"
import { Spin } from "antd"

// должен быть такойже как и в application чтобы человек не заметил разницы
const LoadingPage: React.FC = () => {
	return (
		<div
			style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				minHeight: "100vh",
			}}
		>
			<Spin size="large" description="Loading..." />
			PAGE
		</div>
	)
}

export default LoadingPage
