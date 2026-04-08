import { useState } from "react"
import { TROLE, IRole } from "@/shared/model/Role/types"
import { IDepartment, useDepartmentsStore } from "@/entities/Departments"
import { DropdownOption } from "@/shared/model/SearchDropMenu/SearchDropDownMenu"
import { APIError, loginApi } from "@/shared/api"
import { useAPIErrorHandler } from "@/shared/api/APIErrorHandler"
import { showToast } from "@/shared/ui"
import { useShallow } from "zustand/shallow"

export const useAddUser = () => {
	const departments = useDepartmentsStore(
		useShallow((state) =>
			state.getDepartmentsIncludingAllChildren().slice(1),
		),
	)
	const [selectedDepartment, setSelectedDepartment] =
		useState<IDepartment | null>(null)

	const [roles, setRoles] = useState<IRole[]>(
		Object.entries(TROLE).map(([key, value]) => ({
			name: key as keyof typeof TROLE,
			type: value,
			isEnabled: false,
		})),
	)

	const [url, setUrl] = useState("Тут будет ваша ссылка")
	const handleRolesChange = (allRoles: IRole[]) => {
		setRoles(allRoles)
	}

	const [depError, setDepError] = useState<string | null>(null)

	const handleAPIError = useAPIErrorHandler()

	const handleGetToken = async () => {
		try {
			if (selectedDepartment) {
				if (selectedDepartment.uuid) {
					const token = await loginApi.generateInvite(
						roles.filter((role) => role.isEnabled),
						selectedDepartment.uuid,
					)
					const newUrl = new URL(
						window.location.origin + "/registration/user",
					)
					newUrl.searchParams.set("token", token)
					setUrl(newUrl.toString())
				} else {
					showToast({
						type: "error",
						text: "У отдела нету индефикатора, как странно...",
					})
				}
			} else {
				setDepError("Выберите отдел")
			}
		} catch (error) {
			handleAPIError(error as APIError)
		}
	}

	const departmentOptions: DropdownOption<IDepartment, "uuid">[] =
		departments.map((dept) => ({
			key: dept.uuid ?? dept.id.toString(),
			value: dept,
			label: dept.name,
		}))

	return {
		setSelectedDepartment,
		roles,
		setRoles,
		handleRolesChange,
		url,
		setUrl,
		depError,
		setDepError,
		handleGetToken,
		departmentOptions,
	}
}
