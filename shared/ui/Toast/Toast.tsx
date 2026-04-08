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

interface ToastProps extends IToastItem {
	onRemove: (id: number) => void
	isActive?: boolean
}

const Toast = ({
	type,
	text,
	title,
	duration,
	id,
	onRemove,
	isActive = false,
}: ToastProps) => {
	const [isFade, setIsFade] = useState<boolean>(false)
	const timer = useRef<number>(null)

	const startTimer = useCallback(() => {
		if (timer.current) {
			clearTimeout(timer.current)
		}
		timer.current = window.setTimeout(() => {
			setIsFade(true)
		}, duration)
	}, [duration])

	const toast = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const handleMouseEnter = (e: MouseEvent) => {
			e.stopPropagation()
			if (timer.current) {
				clearTimeout(timer.current)
			}
			// Сохраняем позицию только если тост ещё не активный
			if (!isActive && toast.current) {
				const rect = toast.current.getBoundingClientRect()
				useToastStore.getState().setActiveToast({
					id,
					position: {
						top: rect.top + window.scrollY,
						left: rect.left + window.scrollX,
					},
				})
			}
		}

		const handleMouseLeave = (e: MouseEvent) => {
			e.stopPropagation()
			useToastStore.getState().setActiveToast(null)
			startTimer()
		}

		const handleTransitionEnd = () => {
			// Не удаляем если тост активный
			if (!isActive) {
				onRemove(id)
			}
		}

		const toastElement = toast.current
		toastElement?.addEventListener("mouseenter", handleMouseEnter)
		toastElement?.addEventListener("mouseleave", handleMouseLeave)
		toastElement?.addEventListener("transitionend", handleTransitionEnd)

		return () => {
			toastElement?.removeEventListener("mouseenter", handleMouseEnter)
			toastElement?.removeEventListener("mouseleave", handleMouseLeave)
			toastElement?.removeEventListener(
				"transitionend",
				handleTransitionEnd,
			)

			if (timer.current) {
				clearTimeout(timer.current)
			}
		}
	}, [id, onRemove, startTimer, isActive])

	useEffect(() => {
		if (!isActive) {
			startTimer()
		} else {
			// Если тост активный, отменяем таймер
			if (timer.current) {
				clearTimeout(timer.current)
			}
		}
	}, [isActive, startTimer])

	return (
		<div
			ref={toast}
			className={`toast ${"toast_" + type} ${isFade ? "toast_fade-out" : "toast_fade-in"} ${isActive ? "toast_active" : ""}`}
		>
			{icons.get(type)}
			<h5 className="toast__title">{title}</h5>
			<span className="toas__text">{text}</span>
		</div>
	)
}

export default Toast

export const showToast = (props: IToast) => {
	useToastStore.getState().addToast(props)
}

interface IToastItem extends IToast {
	id: number
}

interface IToastStore {
	toasts: IToastItem[]
	activeToast: {
		id: number
		position: { top: number; left: number }
		activatedAt: number
	} | null
	addToast: (toast: IToast) => void
	removeToast: (id: number) => void
	setActiveToast: (
		toast: { id: number; position: { top: number; left: number } } | null,
	) => void
}

export const useToastStore = create<IToastStore>((set) => {
	let toastId = 0
	return {
		toasts: [],
		activeToast: null,
		addToast: (newToast) =>
			set((state) => ({
				toasts: [
					...state.toasts,
					{
						...newToast,
						title:
							newToast.title ?? defaultTitle.get(newToast.type),
						duration: newToast.duration ?? 3000,
						id: ++toastId,
					},
				],
			})),
		removeToast: (id) =>
			set((state) => ({
				toasts: state.toasts.filter((toast) => toast.id !== id),
			})),
		setActiveToast: (activeToast) =>
			set({
				activeToast: activeToast
					? { ...activeToast, activatedAt: Date.now() }
					: null,
			}),
	}
})

// Ref для хранения ID активного тоста
export const activeToastIdRef = { current: null as number | null }

// Ref для хранения позиции активного тоста
export const activeToastPositionRef = {
	current: null as { top: number; left: number } | null,
}
