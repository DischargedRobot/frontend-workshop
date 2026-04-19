import useFFTableFiltersStore from "@/features/FFTableFilters/model/useFFTableFiltersStore"
import { DeleteIcon, InfoIcon } from "@/shared/assets/Icon"
import { Switch } from "antd"
import { IFeatureFlag } from "../lib/types"
import { TFFTableColumns } from "../ui/FFTable"
import { AbilityContext } from "@/shared/model/Ability"
import { useProfileStore } from "@/entities/Profile"
import { useAbility } from "@casl/react"

interface Params {
	removeFF: (FF: IFeatureFlag) => Promise<void>
	toggleFF: (FF: IFeatureFlag, value: boolean) => Promise<void>
}

export const useFFTableColumns = ({
	removeFF,
	toggleFF,
}: Params): TFFTableColumns => {
	const filters = useFFTableFiltersStore((state) => state.visibleColumns)

	const columns: TFFTableColumns = [
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
			render: (value: boolean, FF: IFeatureFlag) => (
				<Switch
					disabled={!!FF.isToggling}
					checked={value}
					onChange={(checked) => {
						console.log(FF, checked, "toggle", value)
						toggleFF(FF, checked)
					}}
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
	]

	const ability = useAbility(AbilityContext)

	if (ability.can("delete", "FF")) {
		columns.push({
			align: "center",
			title: "",
			key: "delete",
			render: (_, FF) => (
				<button onClick={() => removeFF(FF)}>
					<DeleteIcon />
				</button>
			),
			width: "64px",
		})
	}
	return columns
}
