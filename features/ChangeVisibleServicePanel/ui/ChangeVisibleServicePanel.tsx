import "./ChangeVisibleServicePanel.scss"

import { Button, Empty } from "antd"
import { useChangeVisibleServicePanel } from "../model"
import Service, { IService } from "./Service"
import { DownOutlined, RightOutlined } from "@ant-design/icons"

interface Props {
    service: IService | null
}

const MOCK_SERVICE: IService = {
    serviceId: 1,
    topic: "orders.events.created",
    username: "demo-service-user",
    password: "demo-password-123",
    groupName: "orders-consumers-group",
}

const ChangeVisibleServicePanel = (props: Props) => {
    const { service } = props
    const serviceForPreview = service ?? MOCK_SERVICE

    const {
        isVisible,
        setIsVisible,
    } = useChangeVisibleServicePanel()


    return (
        <div className="service-panel">
            <button
                className={`service-panel__visibility-button  visibility-button
                
                text`}
                onClick={() => setIsVisible(prev => !prev)}
            >
                <RightOutlined className={`icon ${isVisible ? 'icon_visible' : 'icon_hidden'}`} />
                {isVisible ? "Тут сервис" : "Не тут сервис"}
            </button>
            <div className={`service-panel__content ${isVisible ? 'service-panel__content_visible' : 'service-panel__content_hidden'}`}>
                <Service service={serviceForPreview} />
                {!serviceForPreview && (
                    <Empty className="text" description="Пусто" />
                )}
            </div>
        </div >
    )

}

export default ChangeVisibleServicePanel