import { create, UseBoundStore } from "zustand"
import { IDepartment } from "../lib"
import { Department } from "../lib/DepartmentType"
import { StoreApi } from "zustand"
import { useUserFiltersStore } from "@/entities/User"

const InitialDepartments: IDepartment[] = (() => {
	const depts: IDepartment[] = []

	for (let i = 0; i < 5; i++) {
		depts.push({
			id: i,
			name: `Department ${i}`,
			children: [],
			featureFlags: [],
			path: "",
			isService: false,
			version: 1,
		})
	}

	for (let i = 0; i < depts.length - 1; i++) {
		depts[i].children = [depts[i + 1]]
	}

	return [depts[0]]
})()

interface IUseDepartments {
	departments: IDepartment[]
	setDepartments: (newDepartments: IDepartment[]) => void

	removeDepartment: (department: IDepartment) => void
	addDepartment: (department: IDepartment) => void
	changeDepartmentName: (department: IDepartment, newName: string) => void
	changeDepartment: (department: IDepartment) => void
	changeDepartmentChildren: (
		dep: IDepartment,
		children: IDepartment[],
	) => void
	getDepartmentsIncludingAllChildren: () => IDepartment[]
	changeParentDepartment: (dep: IDepartment, newParentDepId: number) => void

	selectedDepartmentIds: number[]
	setSelectedDepartmentIds: (newSelectedDepartmentIds: number[]) => void

	removeSelectedDepartment: () => void
}

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

//TODO: подумать над удалением и добавлением отделов

const removeDep = (
	departments: IDepartment[],
	removedDepartmentIds: number[],
): IDepartment[] => {
	return departments.filter((department) => {
		department.children = removeDep(
			department.children,
			removedDepartmentIds,
		)

		return !removedDepartmentIds.includes(department.id)
	})
}

// const updateDep = (departments: IDepartment[], newDepartment: IDepartment): IDepartment => {
//     console.log('update',  departments, newDepartment)
//     return departments.map(department => {
//         if (department.id === newDepartment.id) {
//             return {...newDepartment}
//         }
//         updateDep(department.children, newDepartment)
//         return department
//     })
// }

const updateDep = (
	departments: IDepartment[],
	newDepartment: IDepartment,
): IDepartment[] => {
	return departments.map((department) => {
		if (department.id === newDepartment.id) {
			return { ...newDepartment }
		}
		if (department.children.length !== 0) {
			const updatedDepartments = updateDep(
				department.children,
				newDepartment,
			)
			if (updatedDepartments !== department.children) {
				return { ...department, children: updatedDepartments }
			}
		}
		return department
	})
}

// TODO: разделить на фабрику и 2 стора (1 просто депс, другие выбранные)
export const useDepartmentsStore = create<IUseDepartments>((set, get) => ({
	departments: [],
	setDepartments: (newDepartments) => set({ departments: newDepartments }),

	selectedDepartmentIds: [],
	setSelectedDepartmentIds: (newSelectedDepartments) =>
		set({ selectedDepartmentIds: newSelectedDepartments }),

	// TODO: сделать независимым от друго стора, передавая через аргс, предусмотреть, что удаляемые департаменты сидят в дочках
	removeSelectedDepartment: () => {
		// console.log(
		// 	removeDep(
		// 		get().departments,
		// 		useUserFiltersStore.getState().departmentIds,
		// 	),
		// 	useUserFiltersStore.getState().departmentIds,
		// 	"selected",
		// )
		set((state) => ({
			departments: removeDep(
				state.departments,
				useUserFiltersStore.getState().departmentIds,
			),
		}))
		useUserFiltersStore.getState().setDepartmentIds([])
	},

	// в теории, тут можно и по ссылке, но на всякий по id
	removeDepartment: (removingDepartment) => {
		set((state) => {
			const removeDep = (departments: IDepartment[]): IDepartment[] => {
				return departments.map((dep) => {
					const updatedDepChildren = removeDep(dep.children)

					return {
						...dep,
						children: updatedDepChildren.filter(
							(child) => child.id !== removingDepartment.id,
						),
					}
				})
			}

			return { departments: removeDep(state.departments) }
		})
	},

	addDepartment: (department) => {
		set((state) => ({ departments: [...state.departments, department] }))
	},

	changeDepartmentName: (department, newName) => {
		set((state) => ({
			departments: state.departments.map((dep) =>
				dep.id === department.id ? { ...dep, name: newName } : dep,
			),
		}))
	},

	changeDepartment: (department: IDepartment) => {
		// set(state => ({departments: [...state.departments.map(dep =>
		//     dep.id === department.id
		//         ? { ...dep, children: children }
		//         : dep
		// )]}))
		set((state) => ({
			departments: updateDep(state.departments, { ...department }),
		}))
	},

	changeDepartmentChildren: (
		department: IDepartment,
		children: IDepartment[],
	) => {
		set((state) => ({
			departments: updateDep(state.departments, {
				...department,
				children: children,
			}),
		}))
	},

	getDepartmentsIncludingAllChildren: () =>
		getDepartmentAndAllChildren(get().departments),

	changeParentDepartment: (department, newParentId) =>
		set((state) => {
			const updateTree = (departments: IDepartment[]): IDepartment[] => {
				return departments.map((dep) => {
					const newChildren = updateTree(dep.children)

					// просматриваем и ищем текущего родителя
					const childrenWithoutTarget = newChildren.filter(
						(c) => c.id !== department.id,
					)

					if (dep.id === newParentId) {
						return {
							...dep,
							children: [...childrenWithoutTarget, department],
						}
					}

					// смотрим дальше
					return {
						...dep,
						children: childrenWithoutTarget,
					}
				})
			}

			return {
				departments: updateTree(state.departments),
			}
		}),
}))

// TODO: gприменить фабрику к Select
interface BaseDepStore {
	departments: IDepartment[]
	setDepartments: (newDepartments: IDepartment[]) => void

	removeDepartment: (department: IDepartment) => void
	addDepartment: (department: IDepartment) => void
}

type ExtendedDepStore<T> = BaseDepStore & T

const createDepartmentStore = <ExtStore = object>(
	extensions?: (
		set: (
			partial:
				| Partial<ExtendedDepStore<ExtStore>>
				| ((
						state: Partial<ExtendedDepStore<ExtStore>>,
				  ) => Partial<ExtendedDepStore<ExtStore>>),
		) => void,
		get: () => ExtendedDepStore<ExtStore>,
	) => ExtStore,
): UseBoundStore<StoreApi<ExtendedDepStore<ExtStore>>> => {
	const baseStore = (
		set: (
			partial:
				| Partial<BaseDepStore>
				| ((state: BaseDepStore) => Partial<BaseDepStore>),
		) => void,
		get: () => BaseDepStore,
	): BaseDepStore => ({
		departments: [],
		setDepartments: (departments) => set({ departments }),

		removeDepartment: (departments) => set({ departments: [] }),
		addDepartment: (departments) => set({ departments: [] }),
	})

	return create((set, get) => {
		const baseSet = set as (
			partial:
				| Partial<BaseDepStore>
				| ((state: BaseDepStore) => Partial<BaseDepStore>),
		) => void
		const baseGet = get as () => BaseDepStore

		const baseActions = baseStore(baseSet, baseGet)
		const addingAction = extensions ? extensions(set, get) : {}

		return {
			...baseActions,
			...addingAction,
		} as ExtendedDepStore<ExtStore>
	}) as UseBoundStore<StoreApi<ExtendedDepStore<ExtStore>>>
}
