import "./ChangeVisibleServicePanel.scss"

import { Button, Empty } from "antd"
import { useChangeVisibleServicePanel } from "../model"
import Service, { IService } from "./Service"
import { DownOutlined, UpOutlined } from "@ant-design/icons"

interface Props {
    service: IService | null
}

const ChangeVisibleServicePanel = (props: Props) => {
    const { service } = props

    const {
        isVisible,
        setIsVisible,
    } = useChangeVisibleServicePanel()


    return (<div className="service-panel">
        <Button
            className={`service-panel__visibility-button 
                ${isVisible ? 'service-panel_visible' : 'service-panel_hidden'}
                text`}
            onClick={() => setIsVisible(prev => !prev)}
            type="primary"
            icon={isVisible ? <UpOutlined /> : <DownOutlined />}
            iconPlacement="end"
        >
            {isVisible ? "Скрыть панель" : "Показать панель"}
        </Button>
        <div className={`service-panel__content ${isVisible ? 'service-panel__content_visible' : 'service-panel__content_hidden'}`}>
            {service
                ? <Service service={service} />
                : <Empty className="text" description="Здесь показываются данные о добавленном сервисе" />
            }
        </div>
    </div>)

}

export default ChangeVisibleServicePanel