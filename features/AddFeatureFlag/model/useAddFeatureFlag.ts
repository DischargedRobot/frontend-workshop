import { useState } from "react"
import { useForm } from "react-hook-form"
import { IFeatureFlag } from "@/entities/FF"

type FormValues = Pick<IFeatureFlag, "name" | "value">

export const useAddFeatureFlag = () => {
	const [isVisible, setIsVisible] = useState(false)

	const {
		handleSubmit,
		formState: { errors },
		register,
	} = useForm<FormValues>()

	const onSubmit = handleSubmit((data: FormValues) => {
		// TODO: подключить API
		console.log(data)
		setIsVisible(false)
	})

	return { onSubmit, errors, register, isVisible, setIsVisible }
}
