import { useForm } from "react-hook-form"
import { IUser } from "../../lib/types"

export const useUserCardForm = (
	user: IUser,
	setUser: (user: IUser) => void,
) => {
	const {
		register,
		handleSubmit,
		formState: { errors, isDirty },
		reset,
		control,
	} = useForm<Pick<IUser, "login" | "departmentId">>({
		defaultValues: user,
	})

	const saveData = (data: Pick<IUser, "login" | "departmentId">) => {
		setUser({ ...user, ...data })
		reset(data)
	}

	const resetData = () => {
		reset(user)
	}

	return {
		register,
		handleSubmit,
		errors,
		isDirty,
		control,
		saveData,
		resetData,
	}
}
