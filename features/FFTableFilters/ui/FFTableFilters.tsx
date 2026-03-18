import './FFTableFilters.scss'
// import useFFFiltersStore from "@/entities/FFTable/model/useFFFiltersStore"
import useFFTableFiltersStore from "../model/useFFTableFiltersStore"
import { Switch } from "antd"

const FFTableFilters = () => {

    const columns = useFFTableFiltersStore(state => state.visibleColumns)
    const toggle = useFFTableFiltersStore(state => state.toggleVisibleColumn)

    return (
        <ul className="ff-table-filters">
            {Object.entries(columns).map(([key, column]) => 
                <li key={key}>
                    <Switch 
                        checked={column.isVisible}
                        onChange={() => toggle(key as keyof typeof columns)}
                    />
                    <span>{column.name}</span>
                </li>
            )}
        </ul>
    )
}

export default FFTableFilters