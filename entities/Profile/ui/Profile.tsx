"use client"

import { Form, Button } from "antd"
import { IProfile } from "../lib/profileTypes"
import Avatar from "@/shared/ui/Avatar"
import RoleList from "@/shared/ui/RoleList"
import "./Profile.scss"
import { useEffect, useMemo } from "react"
import { IRole } from "@/shared/model/Role"
import { TextInput } from "@/shared/ui"
import { useProfileStore } from "../model/useProfileStore"

interface ProfileProps {
	profile: IProfile
	onSubmit?: (values: IProfile) => void
	logOutButton: React.ReactNode
}

export const Profile = ({
	profile,
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
		onSubmit?.(values)
	}

	return (
		<Form
			form={form}
			layout="vertical"
			className="profile-grid"
			autoComplete="off"
			onFinish={handleSubmit}
			requiredMark={false}
		>

			<div className="profile-grid__avatar">
				<Avatar rightButton={logOutButton} size={100} />
			</div>
			<Form.Item
				initialValue={profile.login}
				label="Логин"
				name="login"
				className="profile-grid__login"
			>
				<TextInput disabled placeholder="Логин" />
			</Form.Item>



			<Form.Item
				initialValue={profile.departmentName}
				label="Текущий отдел"
				name="departmentName"
				className="profile-grid__department"
			>
				<TextInput disabled />
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
						Сохранить
					</Button>
				</Form.Item>
			)}
		</Form>
	)
}

export default Profile
