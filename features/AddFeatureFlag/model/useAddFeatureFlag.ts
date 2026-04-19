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
import { useRouter } from "next/router"

type FormValues = Pick<IFeatureFlag, "name" | "value" | "departmentId">

export const useAddFeatureFlag = (organization: IOrganization) => {
	const currentDep = useBreadcrumbStore(
		useShallow((state) => state.getLastDepartment()),
	)

	const [isVisible, setIsVisible] = useState(false)
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

	const { handleAPIError, APIErrorMessage, setAPIErrorMessage } =
		useAddFFErrorHandler()

	const addFFToStore = useFFStore((state) => state.addFeatureFlags)

	const handleFormSubmit = useCallback(
		async (values: FormValues) => {
			try {
				const ff = await FFApi.addFF(
					organization.id,
					values.departmentId,
					values,
				)

				setIsVisible(false)
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
			}
		},
		[organization.id, addFFToStore, departments, form, handleAPIError],
	)

	return {
		form,
		isVisible,
		setIsVisible,
		departments,
		defaultDepartmentId,
		handleFormSubmit,
		APIErrorMessage,
		setAPIErrorMessage,
	}
}
