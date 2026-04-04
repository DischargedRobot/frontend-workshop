import { IFeatureFlag } from "@/entities/FF/ui/FFTable"
import { create } from "zustand"

export type TFeatureFlagTable = {
	[K in keyof Omit<Required<IFeatureFlag>, "id" | "departmentId" | "name">]: {
		name: string
		isVisible: boolean
	}
}

interface IFFTableFiltersStore {
	visibleColumns: TFeatureFlagTable
	setVisibleColumns: (newVisibleColumns: TFeatureFlagTable) => void

	toggleVisibleColumn: (field: keyof TFeatureFlagTable) => void
}

const useFFTableFiltersStore = create<IFFTableFiltersStore>((set, get) => ({
	visibleColumns: {
		departmentName: { name: "Отдел", isVisible: true },
		value: { name: "Статус", isVisible: true },
		lastModified: { name: "Последнее изменние", isVisible: true },
		description: { name: "Описание", isVisible: true },
	},
	setVisibleColumns: (newVisibleColumns) =>
		set({ visibleColumns: newVisibleColumns }),

	toggleVisibleColumn: (field) =>
		set((state) => ({
			visibleColumns: {
				...state.visibleColumns,
				[field]: {
					...state.visibleColumns[field],
					isVisible: !state.visibleColumns[field].isVisible,
				},
			},
		})),
}))

export default useFFTableFiltersStore
