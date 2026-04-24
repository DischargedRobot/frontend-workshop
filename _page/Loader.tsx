import { Spin } from "antd"
import { LoadIconLogo } from "./LoaderIcon"

export const Loader = () => {
    return (
        <div
            style={{
                margin: "0 auto",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
            }}
        >
            <Spin size="large" description="Загрузка, пожалуйста, ожидайте" />
        </div>
    )
}   