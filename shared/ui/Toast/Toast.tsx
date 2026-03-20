'use client'

import './Toast.scss'

import { useEffect, useRef, useState } from 'react'
import { CheckOutlined, ExclamationOutlined, WarningOutlined } from "@ant-design/icons"

type TToast = 'warning' | 'success' | 'error'
const defaultTitle = new Map<TToast, string>([
    ['warning', 'Предупреждение'],
    ['success', 'Успех'],
    ['error', 'Ошибка'],
])

const icons = new Map<TToast, React.ReactNode>([
    ['warning', <WarningOutlined className="toast__icon" key={'warning'}/>],
    ['success', <CheckOutlined className="toast__icon" key={'success'}/>],
    [ 'error', <ExclamationOutlined className="toast__icon" key={'error'}/>],
])

interface Props {
    type: TToast
    text: string
    title?: string 
    duration: number
}

const Toast = (props: Props) => {

    const {
        type,
        text,
        title = defaultTitle.get(type),
        duration,
    } = props

    const [isVisible, setIsVisible] = useState(true)
    const [isFade, setIsFade] = useState(false)
    
    const timer = useRef<number>(null)
    const startTimer = () => {
        // на слуай, если мышка уже была в тосте и чтобы при выходе не дублировалось
        if (timer.current) {
            clearTimeout(timer.current)
        }

        timer.current = window.setTimeout(() => {
            setIsFade(true)
        }, duration)
    }

    useEffect(() => {
        startTimer()

        const handleMouseOut = () => {
            startTimer()
        }

        const handleTransitionEnd = () => {
            if (isFade) {
                setIsVisible(false)
            }
        }

        const handleMouseOver = () => {
            setIsFade(false) // чтобы после возвращение цвета он не исчез
            if (timer.current) {
                clearTimeout(timer.current)
            }
        }

        const toast = document.getElementById('toast') 
        toast?.addEventListener('mouseover', handleMouseOver)
        toast?.addEventListener('mouseout', handleMouseOut)

        toast?.addEventListener('transitionend', handleTransitionEnd)

        return () => {
            toast?.removeEventListener('mouseout', handleMouseOut)
            toast?.removeEventListener('mouseover',handleMouseOver)
            toast?.removeEventListener('transitionend',handleTransitionEnd)

            if (timer.current) {
                clearTimeout(timer.current)
            }
        }
    }, [])

    if (!isVisible) {
        return null
    }

    return (
        <div id={'toast'} className={`toast ${'toast_'+type} ${isFade ? 'toast_fade-out' : 'toast_fade-in' }`}>
            {icons.get(type)}
            <h5 className="toast__title">{title}</h5>
            <span className="toas__text">{text}</span>
        </div>
    )
}

export default Toast

export const showToast = (props: Props): React.ReactNode => {
    const {
        type,
        text,
        title = defaultTitle.get(type),
        duration,
    } = props
    return <Toast 
        key={crypto?.randomUUID() ?? Date.now().toString()} 
        type={type} 
        text={text} 
        title={title} 
        duration={duration}
    />
}