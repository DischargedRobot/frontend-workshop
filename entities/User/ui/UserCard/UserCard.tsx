"use client"

import "./UserCard.scss"

import Avatar from "@/shared/ui/Avatar"
import RoleList from "@/shared/ui/RoleList"
import { IUser } from "../../lib/types"
import { memo } from "react"
import RoleStatus from "@/shared/model/RolesStatus/RolesStatus"
import { useUserCard } from "../../model/UserCard"
import { Can } from "@/shared/model/Ability"
import { areRolesEqual } from "../../model/UserCard/useUserCard"
import { SelectDepartmentSearchDropMenu } from "@/features/SelectDepartmentSearchDropMenu"
import { DeleteButton } from "@/shared/ui"
import { Button } from "antd"

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
		setUserDepartment,
		isDirty,
		departments,
	} = useUserCard(user, setUser)

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
				<h2 className="user-card__name text ">{user.login}</h2>
				<div>

					<SelectDepartmentSearchDropMenu
						defaultValue={user.department}
						onSelect={(dep) => setUserDepartment(prev => dep ?? prev)}
						departments={departments}
					/>

				</div>
				<div style={{ display: "flex", justifyContent: "space-between" }}>
					<Button
						style={{ padding: "0 7px", margin: 0, height: "24px" }}
						className={`text text_litle ${!isDirty ? "disabled" : ""}`}
						onClick={saveData}
						disabled={!isDirty}
					>
						Сохранить
					</Button>
					<Button
						style={{ padding: "0 7px", margin: 0, height: "24px" }}

						className={`text text_litle ${!isDirty ? "disabled" : ""}`}
						disabled={!isDirty}
						onClick={resetData}
					>
						Отменить
					</Button>
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
