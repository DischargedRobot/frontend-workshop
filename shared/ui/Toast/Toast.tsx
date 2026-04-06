"use client"

import "./Toast.scss"

import { useCallback, useEffect, useRef, useState } from "react"
import {
	CheckOutlined,
	ExclamationOutlined,
	WarningOutlined,
} from "@ant-design/icons"
import { create } from "zustand"

type TToast = "warning" | "success" | "error"
const defaultTitle = new Map<TToast, string>([
	["warning", "Предупреждение"],
	["success", "Успех"],
	["error", "Ошибка"],
])

const icons = new Map<TToast, React.ReactNode>([
	["warning", <WarningOutlined className="toast__icon" key={"warning"} />],
	["success", <CheckOutlined className="toast__icon" key={"success"} />],
	["error", <ExclamationOutlined className="toast__icon" key={"error"} />],
])

interface IToast {
	type: TToast
	text: string
	title?: string
	duration?: number
}

const Toast = () => {
	const duration = useToastStore((state) => state.duration)
	const title = useToastStore((state) => state.title)
	const text = useToastStore((state) => state.text)
	const type = useToastStore((state) => state.type)
	const key = useToastStore((state) => state.key)
	const isVisible = useToastStore((state) => state.isVisible)
	const setIsVisible = useToastStore((state) => state.setIsVisible)

	// Исчезает?
	const [isFade, setIsFade] = useState<boolean>(false)
	const timer = useRef<number>(null)

	const startTimer = useCallback(() => {
		if (timer.current) {
			clearTimeout(timer.current)
		}
		timer.current = window.setTimeout(() => {
			// console.log("Время вышло")
			setIsFade(true)
		}, duration)
	}, [duration])

	const toast = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const handleMouseOut = () => {
			startTimer()
		}

		const handleMouseOver = () => {
			setIsFade(false)
			if (timer.current) {
				clearTimeout(timer.current)
			}
		}

		const handleTransitionEnd = () => {
			setIsFade(false)
			setIsVisible(false)
		}

		const toastElement = toast.current
		toastElement?.addEventListener("mouseover", handleMouseOver)
		toastElement?.addEventListener("mouseout", handleMouseOut)
		toastElement?.addEventListener("transitionend", handleTransitionEnd)

		return () => {
			toastElement?.removeEventListener("mouseout", handleMouseOut)
			toastElement?.removeEventListener("mouseover", handleMouseOver)
			toastElement?.removeEventListener(
				"transitionend",
				handleTransitionEnd,
			)

			if (timer.current) {
				clearTimeout(timer.current)
			}
		}
	}, [key])

	useEffect(() => {
		if (isVisible) {
			startTimer()
		}
	}, [key, startTimer, isVisible])

	if (!isVisible) {
		return null
	}

	console.log("toast", isVisible, isFade)
	return (
		<div
			ref={toast}
			className={`toast ${"toast_" + type} ${isFade ? "toast_fade-out" : "toast_fade-in"}`}
		>
			{icons.get(type)}
			<h5 className="toast__title">{title}</h5>
			<span className="toas__text">{text}</span>
		</div>
	)
}

export default Toast

export const showToast = (props: IToast) => {
	const {
		type,
		text = "",
		title = defaultTitle.get(type),
		duration = 3000,
	} = props

	useToastStore.getState().setToast({ type, text, title, duration })
}

interface IToastStore extends IToast {
	key: number
	isVisible: boolean

	setToast: (toast: IToast) => void
	setIsVisible: (isVisible: boolean) => void
}

export const useToastStore = create<IToastStore>((set, get) => ({
	type: "warning",
	text: "Тут текст тоста",
	title: defaultTitle.get("warning"),
	duration: 3000,
	key: 0,
	isVisible: false,

	setToast: (newToast) =>
		set((state) => ({
			...newToast,
			title: newToast?.title ?? defaultTitle.get(newToast.type),
			key: ++state.key,
			isVisible: true,
		})),
	setIsVisible: (newIsVisible) => set({ isVisible: newIsVisible }),
}))
