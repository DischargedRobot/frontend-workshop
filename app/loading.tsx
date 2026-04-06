import React from "react"
import { Spin } from "antd"

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
			<Spin size="large" tip="Loading..." />
			APPLICATION
		</div>
	)
}

export default LoadingPage
