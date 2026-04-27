"use client"

import { Modal, Drawer, Grid } from "antd"
import { memo } from "react"
import { useAddUserModal } from "../model"
import { AddButton } from "@/shared/ui"
import "./AddUser.scss"
import AddUserForm from "./AddUserForm"
import { useAddUser } from "../model"

const AddUser = () => {
	const { isOpen, openModal, closeModal } = useAddUserModal()
	const isMobile = !Grid.useBreakpoint().md
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
			{isMobile ? (
				<Drawer open={isOpen} onClose={closeModal} closable={false} placement="bottom" size="100%">
					<AddUserForm
						form={form}
						url={url}
						departmentOptions={departmentOptions}
						roles={roles}
						onSubmit={onSubmit}
						onValuesChange={onValuesChange}
						onClose={closeModal}
						handleRolesChange={handleRolesChange}
						handleReset={handleReset}
						isClean={isClean}
						isNotFull={isNotFull}
						isLoading={isLoading}
					/>
				</Drawer>
			) : (
				<Modal
					open={isOpen}
					footer={null}
					centered
					onCancel={closeModal}
					closable={false}
					width={"auto"}
				>
					<AddUserForm
						form={form}
						url={url}
						departmentOptions={departmentOptions}
						roles={roles}
						onSubmit={onSubmit}
						onValuesChange={onValuesChange}
						handleRolesChange={handleRolesChange}
						handleReset={handleReset}
						isClean={isClean}
						isNotFull={isNotFull}
						isLoading={isLoading}
					/>
				</Modal>
			)}
		</>
	)
}

export default memo(AddUser)
