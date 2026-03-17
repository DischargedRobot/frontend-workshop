import './TableName.scss'

import DropArrowIcon from "../../assets/Icon/DropArrowIcon/DropArrowIcon"

interface Props { 
    title: string
    isHidden: boolean
    setIsHidden: (isHidden: boolean) => void
}

const TableName = ({title, isHidden, setIsHidden}: Props) => {


    return (
        <button className="table-name" onClick={(() => setIsHidden(isHidden))}>
            <DropArrowIcon rotateDeg={isHidden ? -90 : 0}/>
            <h3 className='title title_litle'>{title}</h3>
        </button>
    )
}

export default TableName