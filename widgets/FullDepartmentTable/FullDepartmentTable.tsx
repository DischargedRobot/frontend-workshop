"use client"

import "./FullDepartmentTabe.scss"

import TableDepartment from "@/entities/Departments/ui/DepartmentTable/DepartmentTable"
import DepartmentBreadcamb from "@/entities/DepartmentBreadcamb/ui/DepartmentBreadcrumb"
import TableName from "@/shared/ui/TableName/TableName"
import { useFFMenu } from "../../app/personal/ffmenu/useFFMenu"
import { useShallow } from "zustand/shallow"
import useBreadcrumbStore from "@/entities/DepartmentBreadcamb/model/useBreadcrumbStore"

const FullDepartmentTable = () => {
	//   const toDepartment  = useDepartment((state) => state.toDepartment)
	const { isHidden, setIsHidden } = useFFMenu(
		useShallow((state) => ({
			isHidden: state.isHidden,
			setIsHidden: state.setIsHidden,
		})),
	)

	// const organisationName = useOrganisationStore(state => state.organisation.name)
	const lastDep = useBreadcrumbStore((state) => state.path.at(-1))
	return (
		<div className="full-department-table">
			<DepartmentBreadcamb />
			<TableName
				title={lastDep?.name ?? "Отделы"}
				isHidden={isHidden}
				setIsHidden={setIsHidden}
			/>
			<TableDepartment />
		</div>
	)
}

export default FullDepartmentTable
