"use client"

import { Button, Form, Modal, QRCode, Typography } from "antd"
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
			<AddButton onClick={openModal} />
			<Modal
				open={isOpen}
				footer={null}
				centered
				onCancel={closeModal}
				closable={false}
				width={"auto"}
			>
				<Form className="add-user">
					<div className="add-user__qr-code-container">
						<QRCode className="qr-code" value={url} />

						<div className="add-user__token-container">
							<Form.Item
								className="add-user__search"
								validateStatus={depError ? "error" : ""}
								help={depError ? "Отдел не выбран!" : ""}
							>
								<SearchDropDownMenu
									className="add-user__search "
									options={departmentOptions}
									onSelect={(deps) => {
										setDepError(null)
										setSelectedDepartment(deps)
									}}
									placeholder="Выберите отдел"
								/>
							</Form.Item>

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

					<Form.Item name="roles">
						<AddUserRoles
							roles={roles}
							onChange={handleRolesChange}
						/>
					</Form.Item>
				</Form>
			</Modal>
		</>
	)
}

export default memo(AddUser)
