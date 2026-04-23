import { Service } from "@/entities/Departments"
import { Modal } from "antd"
import { memo, useState } from "react"

const ShowService = () => {

    const [isOpen, setIsOpen] = useState(false)
    return (
        <Modal
            open={isOpen}
            onCancel={() => setIsOpen(false)}
        >
            {/* <Service /> */}
        </Modal>
    )

}
export default memo(ShowService)