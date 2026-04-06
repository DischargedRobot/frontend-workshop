"use client"

import "./FullDepartmentTree.scss"

import {
	DepartmentTree,
	IDepartment,
	useDepartmentsStore,
} from "@/entities/Departments"
import { useOrganisationStore } from "@/entities/Organisation"
import { AddDepartment } from "@/features/AddDepartment"
import useFullDepartmentTree from "./model/useFullDepartmentTree"
import { DeleteSelectedDepartments } from "@/features/DeleteSelectedDepartments"
import { SearchDropDownMenu } from "@/shared/model/SearchDropMenu"
import { useShallow } from "zustand/shallow"

const FullDepartmentTree = () => {
	useFullDepartmentTree()

	const organisation = useOrganisationStore((state) => state.organisation)
	const departments = useDepartmentsStore(
		useShallow((state) => state.getDepartmentsIncludingAllChildren()),
	)

	return (
		<div className="department-tree">
			<div style={{ position: "sticky", top: "10px" }}>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						gap: "10px",
					}}
				>
					<div className="department-tree__title title text_big">
						<h2>{organisation.name}</h2>
						<div className="department-tree__buttons">
							<AddDepartment
								DepartmentSelector={({ onChange }) => (
									<SearchDropDownMenu<IDepartment>
										options={departments.map((dep) => ({
											key: dep.id,
											label: dep.name,
											value: dep,
										}))}
										onSelect={(dep) =>
											dep && onChange(dep.id)
										}
										placeholder="Выберите отдел"
									/>
								)}
							/>
							<DeleteSelectedDepartments />
						</div>
					</div>
					<DepartmentTree />
				</div>
			</div>
		</div>
	)
}

export default FullDepartmentTree
