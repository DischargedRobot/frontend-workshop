import { Spin } from "antd"

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