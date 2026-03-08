import './TableName.scss'

import DropArrowIcon from "../Icon/DropArrowIcon/DropArrowIcon"

interface Props { 
    title: string
}

const TableName = ({title}: Props) => {
    return (
        <div className="table-name">
            <DropArrowIcon/>
            <h2>{title}</h2>
        </div>
    )
}

export default TableName