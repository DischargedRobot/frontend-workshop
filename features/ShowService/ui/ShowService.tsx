import { IService, Service } from "@/entities/Departments"
import { Modal, Button } from "antd"
import { memo, useState } from "react"

interface Props {
    service: IService
    isOpen: boolean,
    onCancel?: (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

const ShowService = ({ service, isOpen, onCancel }: Props) => {
    const [confirmOpen, setConfirmOpen] = useState(false)

    const handleConfirmOk = () => {
        setConfirmOpen(false)
        onCancel?.()
    }

    return (
        <>
            <Modal
                closable={false}
                centered
                open={isOpen}
                footer={[
                    <Button key="ok" type="default" onClick={() => setConfirmOpen(true)}>
                        Закрыть
                    </Button>
                ]}
            >
                <Service service={service} />
            </Modal>

            <Modal
                closable={false}
                open={confirmOpen}
                onCancel={() => setConfirmOpen(false)}
                centered
                footer={() => (

                    <div style={{ display: 'flex', justifyContent: 'flex-end', flexWrap: "wrap", gap: 8 }}>
                        <Button key="cancel" onClick={() => setConfirmOpen(false)}>
                            Дайте посмотреть ещё раз
                        </Button>
                        <Button key="ok" type="default" onClick={handleConfirmOk}>
                            Закрыть
                        </Button>
                    </div>
                )}
            >

                <h3>Вы уверены? </h3>
                <p>Данные о сервисе видны только сейчас, сохраните их, Вы не сможете просмотреть их снова</p>
            </Modal>
        </>
    )
}
export default memo(ShowService)