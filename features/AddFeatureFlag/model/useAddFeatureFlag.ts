"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { FFApi, IFeatureFlag } from "@/entities/FF"
import { APIError } from "@/shared/api"
import { useBreadcrumbStore } from "@/entities/DepartmentBreadcamb"
import { useShallow } from "zustand/shallow"
import { IOrganisation } from "@/entities/Organisation/model/useOrganisationStore"
import { IDepartment } from "@/entities/Departments"

type FormValues = Pick<IFeatureFlag, "name" | "value" | "departmentId">

export const useAddFeatureFlag = (organisation: IOrganisation) => {
	const currentDep = useBreadcrumbStore(
		useShallow((state) => state.getLastDepartment()),
	)

	const [departmentId, setDepartmentId] = useState<number>(
		currentDep?.id ?? organisation.child.id,
	)

	const [isVisible, setIsVisible] = useState(false)
	// для сброса состояния
	const [resetKey, setResetKey] = useState(0)

	const {
		handleSubmit,
		formState: { errors },
		register,
		control,
		reset,
	} = useForm<FormValues>({
		defaultValues: {
			name: "",
			value: false,
			departmentId: currentDep?.id ?? organisation.child.id,
		},
	})

	const resetForm = () => {
		setDepartmentId(currentDep?.id ?? organisation.child.id)
		setResetKey((k) => k + 1)
		reset()
	}

	const onSubmit = handleSubmit(async (data: FormValues) => {
		try {
			await FFApi.createFF(organisation.id, departmentId, data)
			setIsVisible(false)
		} catch (error) {
			if (error instanceof APIError && error.status == 409) {
			}
		}
	})

	const defaultDep: IDepartment | undefined = currentDep ?? undefined

	const departmentOptions = [
		...(currentDep?.children.map((dep) => ({
			label: dep.name,
			value: dep,
		})) ?? []),
		...(currentDep ? [{ label: currentDep.name, value: currentDep }] : []),
	]

	const handleSelectDepartment = (dep: IDepartment | null) => {
		if (dep) {
			setDepartmentId(dep.id)
			return dep
		}
	}

	return {
		onSubmit,
		control,
		errors,
		register,
		isVisible,
		setIsVisible,
		resetForm,
		resetKey,
		defaultDep,
		departmentOptions,
		handleSelectDepartment,
	}
}
