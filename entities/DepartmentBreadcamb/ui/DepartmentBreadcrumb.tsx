"use client"

import "./DepartmentBreadcrumb.scss"

import { Breadcrumb } from "antd"
import useBreadcrumbStore from "../model/useBreadcrumbStore"
import { useEffect } from "react"
import useFFFiltersStore from "@/entities/FFT/model/useFFFiltersStore"
import useOrganisationStore from "@/entities/Organisation/model/useOrganisationStore"
import { useFFStore } from "@/entities/FFT"
// Promise<{featureFlags: string[]; departments: string[]}>

// const DEPARTMENTS_REQUEST_URL = "http://local:3000/"

const DepartmentBreadcamb = () => {
	// const toDepartment = useFFMenu(state => state.toDepartment)

	const path = useBreadcrumbStore((state) => state.path)
	const setPath = useBreadcrumbStore((state) => state.setPath)

	const rootDepartment = useOrganisationStore(
		(state) => state.organisation.children,
	)

	const setDepartmentFilters = useFFFiltersStore(
		(state) => state.setDepartment,
	)
	useEffect(() => {
		setPath([rootDepartment])
	}, [rootDepartment, setPath])

	console.log(path, "path")
	// const removeFFs = useFFStore(state => state.removeFeatureFlags)
	return (
		<Breadcrumb
			className="text text_litle text_bold"
			items={path.map((item, index) => {
				return {
					title: (
						<button
							className="bredcamb"
							onClick={() => {
								// removeFFs([])
								setDepartmentFilters([
									...path
										.slice(0, index + 1)
										.map((department) => department.id),
									...item.children.map(
										(department) => department.id,
									),
								])
								setPath(path.slice(0, index + 1))
							}}
						>
							{item.name}
						</button>
					),
				}
			})}
		/>
	)
}
export default DepartmentBreadcamb
