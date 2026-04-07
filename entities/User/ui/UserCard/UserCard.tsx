"use client"

import "./UserCard.scss"

import Avatar from "@/shared/ui/Avatar"
import RoleList from "../../../RoleList"
import { IUser } from "../../lib/types"
import { DeleteIcon } from "@/shared/assets/Icon"
import { memo } from "react"
import RoleStatus from "@/shared/model/RolesStatus/RolesStatus"
import UserDepartmentsDropDownMenu from "@/features/UserDepartmentsDropDownMenu"
import { useUserCard } from "../../model/UserCard"
import { Can } from "@/shared/model/Ability"

interface Props {
	user: IUser
	setUser: (user: IUser) => void
}

const UserCard = ({ user, setUser }: Props) => {
	const {
		register,
		handleSubmit,
		errors,
		isDirty,
		control,
		saveData,
		resetData,
		roles,
		setRoles,
		filterRoleList,
		isSelected,
		toggleSelected,
		deleteUserById,
		changeStatusRole,
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
					<button
						className="user-card__delete-button"
						onClick={() => deleteUserById(user.id)}
					>
						<DeleteIcon />
					</button>
				</Can>
			</span>
			<form
				className="user-card__personal-data"
				onSubmit={handleSubmit(saveData)}
			>
				<label className="user-card__field">
					<input
						className="user-card__input text text_litle text_tiny"
						type="text"
						placeholder="Логин"
						{...register("login", {
							minLength: {
								value: 1,
								message:
									"Имя должно содержать хотя бы 1 символ",
							},
							required: "Это поле обязательно для заполнения",
						})}
					/>
					<span className="user-card__error text text_tiny">
						{errors.login?.message?.toString()}
					</span>
				</label>
				<label className="user-card__field">
					<input
						className="user-card__input text text_litle text_tiny"
						type="text"
						placeholder="Пароль"
						{...register("password", {
							minLength: {
								value: 6,
								message: "Размер пароля должен быть больше 6",
							},
							maxLength: {
								value: 25,
								message: "Размер пароля должен быть меньше 25",
							},
							required: "Это поле обязательно для заполнения",
						})}
					/>
					<span className="user-card__error text text_tiny">
						{errors.password?.message?.toString()}
					</span>
				</label>
				<div>
					<UserDepartmentsDropDownMenu
						currentDepartment={user.departmentId}
						control={control}
					/>
					<span className="user-card__error">
						{errors.departmentId?.message ?? ""}
					</span>
				</div>
				<div>
					<button
						className={`text text_litle ${!isDirty ? "disabled" : ""}`}
						type="submit"
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
			</form>
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

export default memo(UserCard)
