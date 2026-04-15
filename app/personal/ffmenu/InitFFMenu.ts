"use client"

import { IFeatureFlag, useFFStore } from "@/entities/FF"
import { useEffect } from "react"

interface Props {
	children: React.ReactNode
	FFs: IFeatureFlag[]
}

export const InitFFMenu = ({ children, FFs }: Props) => {
	// const setFFs = useFFStore((state) => state.setFeatureFlags)

	// console.log(FFs, "InitFFMenu")
	// useEffect(() => {
	// 	setFFs(FFs)
	// }, [])

	return children
}
