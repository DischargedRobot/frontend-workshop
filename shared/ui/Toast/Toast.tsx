import './Toast.scss'

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
}

const Toast = (props: Props) => {

    const {
        type,
        text,
        title = defaultTitle.get(type),
    } = props

    return (
        <div className={`toast ${'toast_'+type}`}>
            {icons.get(type)}
            <h5 className="toast__title">{title}</h5>
            <span className="toas__text">{text}</span>
        </div>
    )
}

export default Toast