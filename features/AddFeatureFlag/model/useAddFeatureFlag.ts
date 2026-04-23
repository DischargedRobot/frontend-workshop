"use client"

import { useState, useMemo, useCallback } from "react"
import { Form } from "antd"
import { FFApi, IFeatureFlag, useFFStore } from "@/entities/FF"
import { APIError } from "@/shared/api"
import { useAddFFErrorHandler } from "./useAddFFErrorHandler"
import { showToast } from "@/shared/ui"
import { useBreadcrumbStore } from "@/entities/DepartmentBreadcamb"
import { useShallow } from "zustand/shallow"
import { IOrganization } from "@/entities/Organization/model/useOrganizationStore"

type FormValues = Pick<IFeatureFlag, "name" | "value" | "departmentId">

export const useAddFeatureFlag = (organization: IOrganization) => {
	const { handleAPIError, APIErrorMessage, setAPIErrorMessage } =
		useAddFFErrorHandler()

	const currentDep = useBreadcrumbStore(
		useShallow((state) => state.getLastDepartment()),
	)

	const [form] = Form.useForm<FormValues>()

	const defaultDepartmentId = useMemo(
		() => currentDep?.id ?? organization.child.id,
		[currentDep, organization.child?.id],
	)

	const departments = useMemo(
		() => [
			...(currentDep?.children ?? []),
			...(currentDep ? [currentDep] : []),
		],
		[currentDep],
	)

	const addFFToStore = useFFStore((state) => state.addFeatureFlags)

	const [isLoading, setIsLoading] = useState(false)
	const handleFormSubmit = useCallback(
		async (values: FormValues) => {
			setIsLoading(true)

			try {
				const ff = await FFApi.addFF(
					organization.id,
					values.departmentId,
					values,
				)

				addFFToStore([
					{
						...ff,
						// всех из стора отделов брать не надо,
						// т.к. добавить можно только к тем, которые видим
						departmentName:
							departments.find((d) => d.id === ff.departmentId)
								?.name ?? "",
					},
				])
				form.resetFields(["name"])
			} catch (error) {
				handleAPIError(error as APIError)
			} finally {
				setIsLoading(false)
			}
		},
		[organization.id, addFFToStore, departments, form, handleAPIError],
	)

	return {
		form,
		departments,
		defaultDepartmentId,
		handleFormSubmit,
		APIErrorMessage,
		isLoading,
		setAPIErrorMessage,
	}
}
