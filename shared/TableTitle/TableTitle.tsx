import DropArrowIcon from "../Icon/DropArrowIcon/DropArrowIcon"

interface Props { 
    title: string
}

const TableTitle = ({title}: Props) => {
    return (
        <div>
            <DropArrowIcon/>
            <h2>{title}</h2>
        </div>
    )
}

export default TableTitle