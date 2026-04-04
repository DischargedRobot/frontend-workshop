import { useState } from "react"
import { useForm } from "react-hook-form"
import { FFApi, IFeatureFlag } from "@/entities/FF"
import { APIError } from "@/shared/api"

type FormValues = Pick<IFeatureFlag, "name" | "value">

export const useAddFeatureFlag = (organisationId: number, nodeId: number) => {
	const [isVisible, setIsVisible] = useState(false)

	const {
		handleSubmit,
		formState: { errors },
		register,
		control,
	} = useForm<FormValues>()

	const onSubmit = handleSubmit(async (data: FormValues) => {
		try {
			await FFApi.createFF(organisationId, nodeId, data)
			setIsVisible(false)
		} catch (error) {
			if (error instanceof APIError && error.status == 409) {
			}
		}
	})

	return { onSubmit, control, errors, register, isVisible, setIsVisible }
}
