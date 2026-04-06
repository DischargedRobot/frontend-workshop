"use client"

import "./FullDepartmentTree.scss"

import { DepartmentTree, IDepartment } from "@/entities/Departments"
import { AddDepartment } from "@/features/AddDepartment"
import { useFullDepartmentTree } from "../model"
import { DeleteSelectedDepartments } from "@/features/DeleteSelectedDepartments"
import { SearchDropDownMenu } from "@/shared/model/SearchDropMenu"

const FullDepartmentTree = () => {
	const { organisation, departments } = useFullDepartmentTree()

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
