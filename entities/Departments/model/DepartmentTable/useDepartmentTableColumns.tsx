import { TableProps } from "antd"
import { mutate } from "swr"

import { FFApi, useFFFiltersStore, useFFStore } from "@/entities/FF"
import { useBreadcrumbStore } from "@/entities/DepartmentBreadcamb"
import { useOrganisationStore } from "@/entities/Organisation"
import { APIError } from "@/shared/api/APIErrors"
import { showToast } from "@/shared/ui"

import { departmentApi } from "../../api"
import { IDepartment } from "../../lib"
import { useDepartmentsStore } from "../useDepartmentsStore"

export const useDepartmentTableColumns = () => {
	const organisationId = useOrganisationStore(
		(state) => state.organisation.id,
	)
	const path = useBreadcrumbStore((state) => state.path)
	const addDepartment = useBreadcrumbStore((state) => state.addDepartment)

	const changeDepartmentChildren = useDepartmentsStore(
		(state) => state.changeDepartmentChildren,
	)
	const removeDepFromLocal = useDepartmentsStore(
		(state) => state.removeDepartment,
	)

	const addFFToStore = useFFStore((state) => state.addFeatureFlags)
	const setFFFilterDepartment = useFFFiltersStore(
		(state) => state.setDepartment,
	)

	const getFFAndAddToStore = async (departmentId: number) => {
		try {
			const FFs = await mutate(
				[
					["organisationId", "departmentId", "featureflags"],
					[organisationId, departmentId],
				],
				() =>
					FFApi.getFFsByDepAndItsChildren(
						departmentId,
						organisationId,
					),
			)
			if (FFs !== undefined) {
				addFFToStore(FFs)
			}
		} catch (error) {
			showToast({
				type: "error",
				text:
					(error as { message?: string })?.message ??
					"Что-то пошло не так",
				duration: 3000,
			})
		}
	}

	// Грузим департаменты с сервера, когда переходим на какой-то из
	const loadData = async (department: IDepartment): Promise<void> => {
		const childrenLastDepartment = department.children

		if (!department.isService) {
			try {
				const children = await mutate(
					[
						["organisationId", "departmentId"],
						[organisationId, department.id],
					],
					() =>
						departmentApi.getChildrenOfDepartments(
							organisationId,
							department.id,
						),
				)

				if (children != undefined) {
					changeDepartmentChildren(department, children)
					setFFFilterDepartment([
						department.id,
						...path.map((dep) => dep.id),
						...children.map((child) => child.id),
					])
				}
			} catch (error) {
				if (error instanceof APIError && error.status === 404) {
					changeDepartmentChildren(department, [])
				}
			}
		} else {
			setFFFilterDepartment([
				department.id,
				...path.map((dep) => dep.id),
				...childrenLastDepartment.map((child) => child.id),
			])
		}
	}

	const removeDepartment = async (dep: IDepartment) => {
		try {
			await departmentApi.removeDepartmentById(organisationId, dep.id)
			removeDepFromLocal(dep)
		} catch (error) {
			console.log(error, "error")
		}
	}

	const columns: TableProps<IDepartment>["columns"] = [
		{
			title: "Имя отдела",
			dataIndex: "name",
			key: "NameDepartment",
			minWidth: 100,
		},
		{
			title: "",
			dataIndex: "link",
			key: "link",
			width: "64px",
			render: (_, department) => (
				<button
					onClick={() => {
						addDepartment(department)
						loadData(department)
						getFFAndAddToStore(department.id)
					}}
				>
					<span>→</span>
				</button>
			),
		},
		{
			title: "",
			key: "delete",
			width: "64px",
			align: "center",
			render: (_, department) => (
				<button
					style={{ alignItems: "center" }}
					onClick={() => removeDepartment(department)}
				>
					<span>✕</span>
				</button>
			),
		},
	]

	return { columns }
}
