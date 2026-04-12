import { memo } from "react"

export interface IService {
    serviceId: number
    topic: string
    username: string
    password: string
    groupName: string
}

interface Props {
    service: IService
}

const Service = (props: Props) => {
    const { service } = props

    return (
        <div className="service">
            <div className="service__row">
                <article className="service__field">
                    <h5 className="service__label">Name</h5>
                    <span className="service__value">{service.username}</span>
                </article>
                <article className="service__field">
                    <h5 className="service__label">Password</h5>
                    <span className="service__value">{service.password}</span>
                </article>
            </div>
            <div className="service__row">
                <article className="service__field">
                    <h5 className="service__label">Topic</h5>
                    <span className="service__value">{service.topic}</span>
                </article>
                <article className="service__field">
                    <h5 className="service__label">Group Name</h5>
                    <span className="service__value">{service.groupName}</span>
                </article>
            </div>
        </div>
    )
}

export default memo(Service)