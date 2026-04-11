"use client"

import { Button, Form, Modal, QRCode, Select, Tooltip, Typography } from "antd"
import { memo, useMemo } from "react"
import { useAddUserModal } from "../model"
import { AddButton } from "@/shared/ui"
import "./AddUser.scss"
import AddUserRoles from "./AddUserRoles"
import { SearchDropDownMenu } from "@/shared/model/SearchDropMenu"
import { useAddUser } from "../model"
import { IDepartment } from "@/entities/Departments"

const { Paragraph } = Typography

const AddUser = () => {
	const { isOpen, openModal, closeModal } = useAddUserModal()
	const {
		roles,
		handleRolesChange,
		url,
		handleReset,
		departmentOptions,
		form,
		onSubmit,
		onValuesChange,
		isClean,
		isNotFull,
		isDisabled,
		isLoading,
	} = useAddUser()


	return (
		<>
			<AddButton onClick={openModal} disabled={isDisabled} />
			<Modal
				open={isOpen}
				footer={null}
				centered
				onCancel={closeModal}
				closable={false}
				width={"auto"}
			>
				<Form form={form} className="add-user" onFinish={onSubmit} onValuesChange={onValuesChange} initialValues={{ departmentUuid: null, roles: null }}>
					<div className="add-user__qr-code-container">
						<QRCode className="qr-code" value={url} />

						<div className="add-user__token-container">
							<Form.Item
								className="add-user__search"
								name="departmentUuid"
							>
								<Select
									className="add-user__search"
									showSearch={{
										optionFilterProp: "label"
									}}
									defaultActiveFirstOption={false}
									options={departmentOptions}
									placeholder="Выберите отдел"
								/>
							</Form.Item>

							<Tooltip title={url ? undefined : "Сначала получите ссылку"}>
								<Paragraph
									copyable={
										!isNotFull
											? false
											: {
												text: url,
												tooltips: [
													"Копировать",
													"Скопировано!",
												],
											}
									}
									className="add-user__token"
									style={
										url.length != 0 ? { cursor: "pointer" } : {}
									}
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
							</Tooltip>

							<div className="add-user__buttons">
								<Button
									className="add-user__button"
									disabled={!isNotFull}
									type="primary"
									htmlType="submit"
									loading={isLoading}
								>
									{isNotFull ? "Получить ссылку" : "Выберите отдел и роли"}
								</Button>
								<Button
									className="add-user__button"
									disabled={isClean}
									type="primary"
									htmlType="reset"
									onClick={handleReset}
								>
									Сбросить
								</Button>

							</div>
						</div>
					</div>

					<Form.Item name="roles">
						<AddUserRoles
							roles={roles}
							onChange={handleRolesChange}
						/>
					</Form.Item>
				</Form>
			</Modal >
		</>
	)
}

export default memo(AddUser)
