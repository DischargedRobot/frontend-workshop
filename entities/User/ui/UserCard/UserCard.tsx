"use client"

import "./UserCard.scss"

import Avatar from "@/shared/ui/Avatar"
import RoleList from "@/shared/ui/RoleList"
import { IUser } from "../../lib/types"
import { DeleteIcon } from "@/shared/assets/Icon"
import { memo } from "react"
import RoleStatus from "@/shared/model/RolesStatus/RolesStatus"
import UserDepartmentsDropDownMenu from "@/features/UserDepartmentsDropDownMenu"
import { useUserCard } from "../../model/UserCard"
import { Can } from "@/shared/model/Ability"
import { areRolesEqual } from "../../model/UserCard/useUserCard"
import { Select } from "antd"
import { SelectDepartmentSearchDropMenu } from "@/features/SelectDepartmentSearchDropMenu"
import { DeleteButton } from "@/shared/ui"

interface Props {
	user: IUser
	setUser: (user: IUser) => void
}

const UserCard = ({ user, setUser }: Props) => {
	const {
		saveData,
		resetData,
		roles,
		setRoles,
		filterRoleList,
		isSelected,
		toggleSelected,
		deleteUser,
		changeStatusRole,
		userDepartment,
		setUserDepartment,
		isDirty,
	} = useUserCard(user, setUser)
	console.log("usercard", userDepartment?.id !== (user.department.id ?? null) ||
		!areRolesEqual(roles, user.roles || []),
		{ userId: user.id, dept: userDepartment, userDept: user.department, roles, userRoles: user.roles })

	return (
		<div className={`user-card ${isSelected ? "user-card_selected" : ""}`}>
			<button
				className="user-card__circle-selection"
				onClick={toggleSelected}
			/>
			<span className="user-card__avatar">
				<Avatar />
				<Can I="delete" an="User">
					<DeleteButton
						className="user-card__delete-button"
						onClick={() => deleteUser()}
					/>
				</Can>
			</span>
			<div className="user-card__personal-data">
				<h2 className="user-card__name">{user.login}</h2>
				<div>

					<SelectDepartmentSearchDropMenu
						defaultValue={userDepartment ?? user.department}
						onSelect={(dep) => setUserDepartment(prev => dep ?? prev)}
					/>

				</div>
				<div style={{ display: "flex", justifyContent: "space-between" }}>
					<button
						className={`text text_litle ${!isDirty ? "disabled" : ""}`}
						onClick={saveData}
						disabled={!isDirty}
					>
						Сохранить
					</button>
					<button
						className={`text text_litle ${!isDirty ? "disabled" : ""}`}
						disabled={!isDirty}
						onClick={resetData}
					>
						Отменить
					</button>
				</div>
			</div>
			<div className="user-card__role-list text text_tiny">
				<div className="role-list__title">
					<h2>Роли</h2>
					<Can I="update" a="FF">
						<RoleStatus setRoles={setRoles} roles={roles} />
					</Can>
				</div>
				<RoleList
					roles={filterRoleList}
					changeRoles={changeStatusRole}
				/>
			</div>
		</div>
	)
}

export default memo(UserCard, (prev, next) => {
	return prev.user.id === next.user.id &&
		prev.user.login === next.user.login &&
		prev.user.department.id === next.user.department.id &&
		areRolesEqual(prev.user.roles || [], next.user.roles || [])
})
