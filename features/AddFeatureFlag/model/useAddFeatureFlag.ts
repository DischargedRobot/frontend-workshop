"use client"

import { useState } from "react"
import { Form } from "antd"
import { FFApi, IFeatureFlag } from "@/entities/FF"
import { APIError, isAPIError } from "@/shared/api"
import { useAPIErrorHandler } from "@/shared/api/APIErrorHandler"
import { showToast } from "@/shared/ui"
import { useBreadcrumbStore } from "@/entities/DepartmentBreadcamb"
import { useShallow } from "zustand/shallow"
import { IOrganisation } from "@/entities/Organisation/model/useOrganisationStore"

type FormValues = Pick<IFeatureFlag, "name" | "value" | "departmentId">

export const useAddFeatureFlag = (organisation: IOrganisation) => {
	const currentDep = useBreadcrumbStore(
		useShallow((state) => state.getLastDepartment()),
	)

	const [isVisible, setIsVisible] = useState(false)
	const [form] = Form.useForm()

	const defaultDepartmentId = currentDep?.id ?? organisation.child.id

	const departments = [
		...(currentDep?.children ?? []),
		...(currentDep ? [currentDep] : []),
	]

	// обработка ошибки
	const handleAPIError = useAPIErrorHandler()
	const handleFormSubmit = async (values: FormValues) => {
		try {
			await FFApi.createFF(organisation.id, values.departmentId, values)
			setIsVisible(false)
			form.resetFields()
		} catch (error) {
			if (isAPIError(error) && error.status === 409) {
				showToast({
					type: "warning",
					text: "Фич флаг с таким именем уже существует",
				})
			} else {
				handleAPIError(error as APIError)
			}
		}
	}

	return {
		form,
		isVisible,
		setIsVisible,
		departments,
		defaultDepartmentId,
		handleFormSubmit,
	}
}
