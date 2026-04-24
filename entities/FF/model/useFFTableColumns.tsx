import useFFTableFiltersStore from "@/features/FFTableFilters/model/useFFTableFiltersStore"
import { DeleteIcon, InfoIcon } from "@/shared/assets/Icon"
import { Grid, Switch } from "antd"
import { IFeatureFlag } from "../lib/types"
import { TFFTableColumns } from "../ui/FFTable"
import { AbilityContext } from "@/shared/model/Ability"
import { } from "@/entities/Profile"
import { useAbility } from "@casl/react"
import { useEffect, useMemo } from "react"



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
			minWidth: 120,
			ellipsis: true,
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
						// console.log(FF, checked, "toggle", value)
						toggleFF(FF, checked)
					}}
				/>
			),
		},
		{
			title: "Отдел",
			key: "departmentName",
			dataIndex: "departmentName",
			minWidth: 80,
			ellipsis: true,
			hidden: !filters.departmentName.isVisible,
		},]



	const isMobile = !Grid.useBreakpoint().sm
	if (!isMobile) {
		columns.push(
			{
				align: "center",
				title: "Последнее изменение",
				key: "lastUpdate",
				dataIndex: "lastUpdate",
				hidden: !filters.lastUpdate.isVisible,
				ellipsis: true,
			},
			// {
			// 	align: "center",
			// 	title: "Описание",
			// 	key: "description",
			// 	dataIndex: "description",
			// 	render: (value: string) => <InfoIcon info={value} />,
			// 	hidden: !filters.description.isVisible,
			// 	ellipsis: true,
			// },
		)
	}



	const ability = useAbility(AbilityContext)
	if (ability.can("delete", "FF")) {
		columns.push({
			title: "Удалить",
			key: "delete",
			width: "100px",
			minWidth: 64,
			align: "center",
			render: (_, FF) => (
				<button onClick={() => removeFF(FF)}>
					<DeleteIcon />
				</button>
			),
		})
	}



	return columns
}
