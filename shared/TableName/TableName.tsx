import './TableName.scss'

import DropArrowIcon from "../assets/Icon/DropArrowIcon/DropArrowIcon"

interface Props { 
    title: string
    isHidden: boolean
    setIsHidden: (isHidden: boolean) => void
}

const TableName = ({title, isHidden, setIsHidden}: Props) => {


    return (
        <button className="table-name" onClick={(() => setIsHidden(isHidden))}>
            <DropArrowIcon rotateDeg={isHidden ? -90 : 0}/>
            <h2>{title}</h2>
        </button>
    )
}

export default TableName