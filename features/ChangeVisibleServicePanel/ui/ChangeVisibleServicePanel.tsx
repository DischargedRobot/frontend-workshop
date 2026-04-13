import "./ChangeVisibleServicePanel.scss"

import { Empty } from "antd"
import { useChangeVisibleServicePanel } from "../model"
import { RightOutlined } from "@ant-design/icons"
import { Service, IService } from "@/entities/Departments"

const MOCK_SERVICE: IService = {
    topicName: "orders.events.created",
    username: "demo-service-user",
    password: "demo-password-123",
    groupName: "orders-consumers-group",
}

interface Props {
    service: IService | null
}

const ChangeVisibleServicePanel = ({ service }: Props) => {

    const { isVisible, setIsVisible } = useChangeVisibleServicePanel()

    return (
        <div className="service-panel">
            <button
                className={`service-panel__visibility-button  visibility-button text`}
                onClick={() => setIsVisible((prev) => !prev)}
            >
                <RightOutlined className={`icon ${isVisible ? "icon_visible" : "icon_hidden"}`} />
                {isVisible ? "Тут сервис" : "Не тут сервис"}
            </button>
            <div className={`service-panel__content ${isVisible ? 'service-panel__content_visible' : 'service-panel__content_hidden'}`}>
                {!!service ? <Service service={service} /> : <Empty className="text" description="Пусто" />}
            </div>
        </div>
    )
}

export default ChangeVisibleServicePanel