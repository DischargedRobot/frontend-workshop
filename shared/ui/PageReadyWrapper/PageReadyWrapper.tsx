"use client"
import { useApplicationStore } from "@/shared/model/Application"
import { Spin } from "antd"
import React from "react"

interface PageReadyWrapperProps {
	children?: React.ReactNode
	fallback?: React.ReactNode
}

export const PageReadyWrapper = ({
	children,
	fallback,
}: PageReadyWrapperProps) => {
	const isLoading = useApplicationStore((state) => state.isLoading)

	if (isLoading) {
		return (
			fallback || (
				<Spin
					size="large"
					style={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						height: "100vh",
					}}
				/>
			)
		)
	}

	return <>{children}</>
}
