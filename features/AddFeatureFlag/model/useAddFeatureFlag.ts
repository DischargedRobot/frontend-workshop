"use client"

import { useState } from "react"
import { Form } from "antd"
import { FFApi, IFeatureFlag, useFFStore } from "@/entities/FF"
import { APIError, isAPIError } from "@/shared/api"
import { useAPIErrorHandler } from "@/shared/api/APIErrorHandler"
import { showToast } from "@/shared/ui"
import { useBreadcrumbStore } from "@/entities/DepartmentBreadcamb"
import { useShallow } from "zustand/shallow"
import { IOrganization } from "@/entities/Organization/model/useOrganizationStore"
import { Server } from "http"

type FormValues = Pick<IFeatureFlag, "name" | "value" | "departmentId">

export const useAddFeatureFlag = (organization: IOrganization) => {
	const currentDep = useBreadcrumbStore(
		useShallow((state) => state.getLastDepartment()),
	)

	const [isVisible, setIsVisible] = useState(false)
	const [form] = Form.useForm()

	const defaultDepartmentId = currentDep?.id ?? organization.child.id

	const departments = [
		...(currentDep?.children ?? []),
		...(currentDep ? [currentDep] : []),
	]

	const handleAPIError = useAPIErrorHandler([
		{
			error: new APIError(409, "Conflict"),
			handler: () => {
				showToast({
					type: "warning",
					text: "Фич флаг с таким именем уже существует",
				})
			},
		},
	])

	const addFFToStore = useFFStore((state) => state.addFeatureFlags)
	const handleFormSubmit = async (values: FormValues) => {
		try {
			const ff = await FFApi.addFF(
				organization.id,
				values.departmentId,
				values,
			)
			setIsVisible(false)
			addFFToStore([ff])
			// form.resetFields()
		} catch (error) {
			handleAPIError(error as APIError)
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
