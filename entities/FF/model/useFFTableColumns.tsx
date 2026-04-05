import useFFTableFiltersStore from "@/features/FFTableFilters/model/useFFTableFiltersStore"
import { DeleteIcon, InfoIcon } from "@/shared/assets/Icon"
import { Switch } from "antd"
import { IFeatureFlag } from "../lib/types"
import { TFFTableColumns } from "../ui/FFTable"

interface Params {
	removeFF: (FF: IFeatureFlag) => Promise<void>
	toggleFF: (FF: IFeatureFlag, value: boolean) => Promise<void>
}

export const useFFTableColumns = ({
	removeFF,
	toggleFF,
}: Params): TFFTableColumns => {
	const filters = useFFTableFiltersStore((state) => state.visibleColumns)

	return [
		{
			title: "Имя",
			key: "name",
			dataIndex: "name",
		},
		{
			hidden: !filters.value.isVisible,
			align: "center",
			title: "Включён",
			key: "value",
			dataIndex: "value",
			render: (value: boolean, FF) => (
				<Switch
					defaultChecked={value}
					onChange={(checked) => toggleFF(FF, checked)}
				/>
			),
		},
		{
			title: "Отдел/Проект",
			key: "departmentName",
			dataIndex: "departmentName",
			hidden: !filters.departmentName.isVisible,
		},
		{
			align: "center",
			title: "Последнее изменение",
			key: "lastModified",
			dataIndex: "lastModified",
			hidden: !filters.lastModified.isVisible,
		},
		{
			align: "center",
			title: "Описание",
			key: "description",
			dataIndex: "description",
			render: (value: string) => <InfoIcon info={value} />,
			hidden: !filters.description.isVisible,
		},
		{
			align: "center",
			title: "",
			key: "delete",
			render: (_, FF) => (
				<button onClick={() => removeFF(FF)}>
					<DeleteIcon />
				</button>
			),
			width: "64px",
		},
	]
}
