import useFFFiltersStore from "@/entities/FFTable/model/useFFFiltersStore"
import useFFTableFiltersStore from "../model/useFFTableFiltersStore"
import { Switch } from "antd"

const FFTableFilters = () => {

    const columns = useFFTableFiltersStore(state => state.visibleColumns)
    const toggle = useFFTableFiltersStore(state => state.toggleVisibleColumn)

    return (
        <ul>
            {Object.entries(columns).map(([key, column]) => 
                <li key={key}>
                    <Switch 
                        checked={column.isVisible}
                        onChange={() => toggle(key as keyof typeof columns)}
                    />
                    {column.name}
                </li>
            )}
        </ul>
    )
}

export default FFTableFilters