import { TableProps, Tooltip } from "antd"
import { mutate } from "swr"

import { FFApi, useFFFiltersStore, useFFStore } from "@/entities/FF"
import { useBreadcrumbStore } from "@/entities/DepartmentBreadcamb"
import { useOrganizationStore } from "@/entities/Organization"
import { APIError, mapAPIErrors } from "@/shared/api/APIErrors"

import { departmentApi } from "../../api"
import { IDepartment } from "../../lib"
import { useDepartmentsStore } from "../useDepartmentsStore"
import { useAPIErrorHandler } from "@/shared/api/APIErrorHandler"
import { useState } from "react"
import { DeleteIcon } from "@/shared/assets/Icon"
import { ArrowRightOutlined } from "@ant-design/icons"

export const useDepartmentTableColumns = () => {
	const organizationId = useOrganizationStore(
		(state) => state.organization.id,
	)
	const path = useBreadcrumbStore((state) => state.path)
	const addDepartment = useBreadcrumbStore((state) => state.addDepartment)

	const changeDepartmentChildren = useDepartmentsStore(
		(state) => state.changeDepartmentChildren,
	)
	const removeDepFromStore = useDepartmentsStore(
		(state) => state.removeDepartments,
	)

	const addFFToStore = useFFStore((state) => state.addFeatureFlags)
	const setFFFilterDepartments = useFFFiltersStore(
		(state) => state.setDepartments,
	)

	const handleError = useAPIErrorHandler([{
		error: mapAPIErrors(404), handler: () => {
			// console.log("В этом отделе фич флагов нет")
		}
	}])

	// Получение фич флагов для выбранного отдела
	const getFFAndAddToStore = async (departmentId: number) => {
		try {
			const FFs = await mutate(
				[
					["organizationId", "departmentId", "featureflags"],
					[organizationId, departmentId],
				],
				() =>
					FFApi.getFFsByDepAndItsChildren(
						departmentId,
						organizationId,
					),
			)
			if (FFs !== undefined) {
				addFFToStore(FFs)
			}
		} catch (error) {
			handleError(error)

		}
	}

	const [isLoading, setIsLoading] = useState(false)
	// Грузим департаменты с сервера, когда переходим на какой-то из
	const loadData = async (department: IDepartment): Promise<void> => {
		setIsLoading(true)
		const childrenLastDepartment = department.children
		if (!department.isService) {
			try {
				const children = await mutate(
					[
						["organizationId", "departmentId"],
						[organizationId, department.id],
					],
					() =>
						departmentApi.getChildrenOfDepartments(
							organizationId,
							department.id,
						),
				)
				changeDepartmentChildren(department, children ?? [])
				setFFFilterDepartments([
					department,
					...path,
					...(children ?? []),
				])
			} catch (error) {
				if (error instanceof APIError && error.status === 404) {
					changeDepartmentChildren(department, [])
					setFFFilterDepartments([
						department,
						...path,
					])
				}
			}
		} else {
			setFFFilterDepartments([
				department,
				...path,
				...childrenLastDepartment,
			])
		}
		setIsLoading(false)
	}

	const removeDepartment = async (dep: IDepartment) => {
		try {
			await departmentApi.removeDepartmentById(organizationId, dep.id)
			removeDepFromStore([dep])
		} catch (error) {
			// handleError(error)
		}
	}

	const columns: TableProps<IDepartment>["columns"] = [
		{
			title: <Tooltip title="Имя отдела">Название</Tooltip>,
			dataIndex: "name",
			key: "NameDepartment",
			minWidth: 100,
			ellipsis: true,
		},
		{
			title: <Tooltip title="Дочерние отделы">Дочерние</Tooltip>,
			dataIndex: "link",
			key: "link",
			minWidth: 64,
			align: "center",
			ellipsis: true,

			render: (_, department) => (
				<button
					onClick={() => {
						addDepartment(department)
						loadData(department)
						getFFAndAddToStore(department.id)
					}}
				>
					<ArrowRightOutlined />
				</button>
			),
		},
		{
			title: "Удалить",
			key: "delete",
			width: "100px",
			minWidth: 64,
			align: "center",
			ellipsis: true,

			render: (_, department) => (
				<button
					style={{ alignItems: "center" }}
					onClick={() => removeDepartment(department)}
				>
					<DeleteIcon />
				</button>
			),
		},
	]

	return { columns, isLoading }
}
