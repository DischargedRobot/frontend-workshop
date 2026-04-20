import { Spin } from "antd"
import { LoadIconLogo } from "./LoaderIcon"

export const Loader = () => {
    return (
        <div
            style={{
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