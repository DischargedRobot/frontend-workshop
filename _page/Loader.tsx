import { Spin } from "antd"
import { LoadIconLogo } from "./LoaderIcon"

export const Loader = () => {
    return (
        <div
            style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
            }}
        >
            <Spin size="large" description="Секундочку..." />
        </div>
    )
}   