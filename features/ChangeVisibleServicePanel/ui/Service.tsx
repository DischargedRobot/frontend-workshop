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
            <div className="service__title">Service ID: {service.serviceId}</div>
            <div className="service__title">Topic: {service.topic}</div>
            <div className="service__subtitle">Username: {service.username}</div>
            <div className="service__subtitle">Password: {service.password}</div>
            <div className="service__subtitle">Group Name: {service.groupName}</div>
        </div>
    )
}

export default memo(Service)