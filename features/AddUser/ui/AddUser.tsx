"use client"

import { Button, Modal, QRCode, Typography } from "antd"
import { memo } from "react"
import { useAddUserModal } from "../model"
import { AddButton } from "@/shared/ui"
import "./AddUser.scss"
import AddUserRoles from "./AddUserRoles"
import { SearchDropDownMenu } from "@/shared/model/SearchDropMenu"
import { useAddUser } from "../model"

const { Paragraph } = Typography

const AddUser = () => {
	const { isOpen, openModal, closeModal } = useAddUserModal()
	const {
		setSelectedDepartment,
		roles,
		handleRolesChange,
		url,
		depError,
		setDepError,
		handleGetToken,
		departmentOptions,
	} = useAddUser()

	return (
		<>
			<AddButton onClick={openModal}>Добавить пользователя</AddButton>
			<Modal
				open={isOpen}
				footer={null}
				centered
				onCancel={closeModal}
				closable={false}
				width={"auto"}
			>
				<div className="add-user">
					<div className="add-user__qr-code-container">
						<QRCode className="qr-code" value={url} />

						<div className="add-user__token-container">
							<div className="add-user__search ">
								<SearchDropDownMenu
									className="add-user__search "
									options={departmentOptions}
									onSelect={(deps) => {
										setDepError(null)
										setSelectedDepartment(deps)
									}}
									placeholder="Выберите отдел"
								/>
								{depError ? (
									<span
										style={{ color: "var(--toast-error)" }}
									>
										Отдел не выбран!
									</span>
								) : (
									""
								)}
							</div>

							<Paragraph
								copyable={{
									text: url,
									tooltips: ["Копировать", "Скопировано!"],
								}}
								className="add-user__token"
								style={{ cursor: "pointer" }}
								onClick={(e) => {
									const copyIcon =
										e.currentTarget.querySelector(
											".anticon-copy, .anticon-check",
										)
									if (copyIcon instanceof HTMLElement) {
										copyIcon.click()
									}
								}}
							>
								<div className="url">{url}</div>
							</Paragraph>
							<Button type="primary" onClick={handleGetToken}>
								Получить ссылку
							</Button>
						</div>
					</div>

					<AddUserRoles roles={roles} onChange={handleRolesChange} />
				</div>
			</Modal>
		</>
	)
}

export default memo(AddUser)
