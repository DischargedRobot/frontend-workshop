import { useRef, useState } from "react"

type DragRef = { startX: number; startW: number; pointerId: number } | null

export const useResizableWidth = (
    initialWidth = 250,
    options?: { min?: number; max?: number; maxVw?: number },
) => {
    const { min = 180, max = 360, maxVw = 0.4 } = options || {}
    const [width, setWidth] = useState<number>(initialWidth)
    const dragRef = useRef<DragRef>(null)

    const treeMaxWidthPx = () => {
        if (typeof window === "undefined") return max
        return Math.min(max, Math.round(window.innerWidth * maxVw))
    }

    const clampWidth = (w: number) => Math.max(min, Math.min(treeMaxWidthPx(), w))

    const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
        e.currentTarget.setPointerCapture(e.pointerId)
        dragRef.current = { startW: width, startX: e.clientX, pointerId: e.pointerId }
    }

    const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
        const d = dragRef.current
        if (!d || e.pointerId !== d.pointerId) return
        const next = clampWidth(d.startW + (e.clientX - d.startX))
        setWidth(next)
    }

    const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
        const d = dragRef.current
        if (d && e.pointerId === d.pointerId && e.pointerId) {
            dragRef.current = null
            e.currentTarget.releasePointerCapture(e.pointerId)
        }
    }

    return { width, setWidth, onPointerDown, onPointerMove, onPointerUp }
}

export default useResizableWidth
