"use client"

import "./Toasts.scss"

import Toast from "./Toast"
import { useToastStore } from "./Toast"

const Toasts = () => {
	const toasts = useToastStore((state) => state.toasts)
	const activeToast = useToastStore((state) => state.activeToast)
	const removeToast = useToastStore((state) => state.removeToast)
	const setActiveToast = useToastStore((state) => state.setActiveToast)

	const activeToastData = toasts.find((t) => t.id === activeToast?.id)

	return (
		<>
			<div className="toasts-container">
				{toasts.map((toast) => {
					// Если это активный тост, рендерим пустой placeholder
					if (toast.id !== activeToast?.id) {
						return (
							<Toast
								key={toast.id}
								{...toast}
								onRemove={removeToast}
							/>
						)
					}
				})}
			</div>
			{/* Рендерим активный тост вне списка */}
			{activeToastData && activeToast && (
				<div
					className="toasts-overlay toast_fixed"
					style={{
						top: `${activeToast.position.top}px`,
						left: `${activeToast.position.left}px`,
					}}
					onMouseEnter={() => setActiveToast(activeToast)}
					onMouseLeave={() => setActiveToast(null)}
				>
					<Toast
						{...activeToastData}
						onRemove={removeToast}
						isActive={true}
					/>
				</div>
			)}
		</>
	)
}

export default Toasts
