import { create, UseBoundStore } from "zustand"
import { StoreApi } from "zustand"
import { IDepartment } from "../lib"

export interface BaseDepStore {
	departments: IDepartment[]
	setDepartments: (newDepartments: IDepartment[]) => void

	removeDepartments: (departments: IDepartment[]) => void
}

export type ExtendedDepStore<T> = BaseDepStore & T

export const createDepartmentStore = <ExtStore = object>(
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
	): BaseDepStore => ({
		departments: [],
		setDepartments: (departments) => set({ departments }),

		removeDepartments: (removingDepartments) => {
			set((state) => {
				const removeDep = (
					departments: IDepartment[],
				): IDepartment[] => {
					return departments.map((dep) => {
						const updatedDepChildren = removeDep(dep.children)

						return {
							...dep,
							children: updatedDepChildren.filter(
								(child) =>
									!removingDepartments.some(
										(rd) => rd.id === child.id,
									),
							),
						}
					})
				}

				const removingIds = removingDepartments.map((d) => d.id)
				return {
					departments: removeDep(state.departments).filter(
						(dep) => !removingIds.includes(dep.id),
					),
				}
			})
		},
	})

	return create((set, get) => {
		const baseSet = set as (
			partial:
				| Partial<BaseDepStore>
				| ((state: BaseDepStore) => Partial<BaseDepStore>),
		) => void

		const baseActions = baseStore(baseSet)
		const addingAction = extensions ? extensions(set, get) : {}

		return {
			...baseActions,
			...addingAction,
		} as ExtendedDepStore<ExtStore>
	}) as UseBoundStore<StoreApi<ExtendedDepStore<ExtStore>>>
}
