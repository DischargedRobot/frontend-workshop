import { useState } from "react"

export const useAddUserModal = () => {
	const [isOpen, setIsOpen] = useState(false)

	const openModal = () => setIsOpen(true)
	const closeModal = () => setIsOpen(false)

	return {
		isOpen,
		openModal,
		closeModal,
	}
}
