"use client"

import { Form, Input, Spin, Button } from "antd"
import { IProfile } from "../lib"
import Avatar from "@/shared/ui/Avatar"
import RoleList from "@/shared/ui/RoleList"
import RoleStatus from "@/shared/model/RolesStatus/RolesStatus"
import "./Profile.scss"
import { useEffect, useMemo } from "react"
import { IRole } from "@/shared/model/Role"

interface ProfileProps {
	profile: IProfile
	departmentName?: string
	loading?: boolean
	onSubmit?: (values: IProfile) => void
	logOutButton?: React.ReactNode
}

export const Profile = ({
	profile,
	departmentName = "Не указан",
	onSubmit,
	logOutButton,
}: ProfileProps) => {
	const [form] = Form.useForm()

	// Инициализация формы при изменении профиля
	useEffect(() => {
		form.setFieldsValue({
			login: profile.login,
			roles: profile.roles,
		})
	}, [profile, form])

	// Получаем роли из формы
	const roles = Form.useWatch("roles", form) || profile.roles

	const filterRoleList = useMemo(
		() => roles.filter((role: IRole) => role.isEnabled),
		[roles],
	)

	// const handleRolesChange = (newRoles: IRole[]) => {
	// 	form.setFieldsValue({ roles: newRoles })
	// }

	const handleSubmit = (values: IProfile) => {
		console.log("Form values:", values)
		onSubmit?.(values)
	}

	return (
		<Form
			form={form}
			layout="vertical"
			className="profile-grid"
			autoComplete="off"
			onFinish={handleSubmit}
		>

			<div className="profile-grid__avatar">
				<Avatar rightButton={logOutButton} />
			</div>

			<Form.Item
				label="Логин"
				name="login"
				className="profile-grid__login"
			>
				<Input disabled placeholder="Логин" />
			</Form.Item>

			<Form.Item
				label="Текущий отдел"
				className="profile-grid__department"
			>
				<Input disabled value={departmentName} />
			</Form.Item>


			<div className="profile-grid__roles-wrapper">
				<h2 className="role-list__title">Роли</h2>
				<Form.Item name="roles" className="profile-grid__roles">
					<RoleList roles={filterRoleList} disabled />
				</Form.Item>
			</div>

			{onSubmit && (
				<Form.Item className="profile-grid__submit">
					<Button type="primary" htmlType="submit">
						Сохранитьdff
					</Button>
				</Form.Item>
			)}
		</Form>
	)
}

export default Profile
