import { IDepartment } from "../lib"
import { createDepartmentStore } from "./createDepartmentStoreFactory"

const getDepartmentAndAllChildren = (
	departments: IDepartment[],
): IDepartment[] => {
	return departments.reduce(
		(allDepartments: IDepartment[], department: IDepartment) => {
			allDepartments.push(department)

			if (department.children.length != 0) {
				allDepartments.push(
					...getDepartmentAndAllChildren(department.children),
				)
			}

			return allDepartments
		},
		[],
	)
}

const updateDep = (
	departments: IDepartment[],
	newDepartment: IDepartment,
): IDepartment[] => {
	return departments.map((department) => {
		if (department.id === newDepartment.id) {
			return { ...newDepartment }
		}

		const updatedDepartments = updateDep(department.children, newDepartment)
		// если дети не изменились, то возвращаем тот же объект
		if (updatedDepartments === department.children) {
			return department
		}
		// иначе новый, обновив у него детей
		return { ...department, children: updatedDepartments }
	})
}

interface DepartmentStoreExtensions {
	changeDepartmentName: (department: IDepartment, newName: string) => void
	changeDepartment: (department: IDepartment) => void
	changeDepartmentChildren: (
		department: IDepartment | number,
		children: IDepartment[],
	) => void
	addDepartmentToParent: (
		parent: IDepartment | number,
		department: IDepartment,
	) => void
	getDepartmentsIncludingAllChildren: () => IDepartment[]
	getDepartmentsIncludingAllChildrenWithoutRoot: () => IDepartment[]
	changeParentDepartment: (dep: IDepartment, newParentDepId: number) => void
}

export const useDepartmentsStore =
	createDepartmentStore<DepartmentStoreExtensions>((set, get) => ({
		changeDepartmentName: (department, newName) => {
			set((state) => ({
				departments: (state.departments as IDepartment[]).map((dep) =>
					dep.id === department.id ? { ...dep, name: newName } : dep,
				),
			}))
		},

		changeDepartment: (department: IDepartment) => {
			set((state) => ({
				departments: updateDep(state.departments as IDepartment[], {
					...department,
				}),
			}))
		},

		changeDepartmentChildren: (
			depart: IDepartment | number,
			children: IDepartment[],
		) => {
			const depId = typeof depart === "number" ? depart : depart.id
			set((state) => {
				const update = (departments: IDepartment[]): IDepartment[] =>
					departments.map((dep) =>
						dep.id === depId
							? { ...dep, children }
							: { ...dep, children: update(dep.children) },
					)
				return {
					departments: update(state.departments as IDepartment[]),
				}
			})
		},

		addDepartmentToParent: (
			parent: IDepartment | number,
			department: IDepartment,
		) => {
			const parentId = typeof parent === "number" ? parent : parent.id
			set((state) => {
				const update = (departments: IDepartment[]): IDepartment[] =>
					departments.map((dep) =>
						dep.id === parentId
							? {
									...dep,
									children: [...dep.children, department],
								}
							: { ...dep, children: update(dep.children) },
					)
				return {
					departments: update(state.departments as IDepartment[]),
				}
			})
		},

		getDepartmentsIncludingAllChildren: () =>
			getDepartmentAndAllChildren(get().departments),

		getDepartmentsIncludingAllChildrenWithoutRoot: () => {
			const all = getDepartmentAndAllChildren(get().departments)
			return all.slice(1)
		},

		changeParentDepartment: (department, newParentId) =>
			set((state) => {
				const updateTree = (
					departments: IDepartment[],
				): IDepartment[] => {
					return departments.map((dep) => {
						const newChildren = updateTree(dep.children)

						const childrenWithoutTarget = newChildren.filter(
							(c) => c.id !== department.id,
						)

						if (dep.id === newParentId) {
							return {
								...dep,
								children: [
									...childrenWithoutTarget,
									department,
								],
							}
						}

						return {
							...dep,
							children: childrenWithoutTarget,
						}
					})
				}

				return {
					departments: updateTree(state.departments as IDepartment[]),
				}
			}),
	}))
