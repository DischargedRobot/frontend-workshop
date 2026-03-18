import './FFTableFilters.scss'
// import useFFFiltersStore from "@/entities/FFTable/model/useFFFiltersStore"
import useFFTableFiltersStore from "../model/useFFTableFiltersStore"
import { Switch } from "antd"
import { FilterOutlined } from '@ant-design/icons'
import { useState } from 'react'

const FFTableFilters = () => {

    const columns = useFFTableFiltersStore(state => state.visibleColumns)
    const toggle = useFFTableFiltersStore(state => state.toggleVisibleColumn)

    const [isCollapsed, setIsCollapsed] = useState(false)
    return (
        <div 
            className='ff-table-filters'
            onBlur={() => setIsCollapsed(prev => !prev)}
        >
            <button 
                className='ff-table-filters__button'
                onClick={() => setIsCollapsed(prev => !prev)}
                >
                <FilterOutlined/>
            </button>
            <ul className={`ff-table-filters__panel ${isCollapsed ? "ff-table-filters__panel_collapsed":""}`}>
                {Object.entries(columns).map(([key, column]) => 
                    <li key={key}>
                        <Switch 
                            checked={column.isVisible}
                            onChange={() => toggle(key as keyof typeof columns)}
                        />
                        <span className='text'>{column.name}</span>
                    </li>
                )}
            </ul>
        </div>
        
    )
}

export default FFTableFilters