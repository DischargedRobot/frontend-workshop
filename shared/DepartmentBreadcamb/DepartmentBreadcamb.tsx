import { Breadcrumb } from "antd"

interface Props {
    path: string[]
}

const DepartmentBreadcamb = ( {path}: Props) => {

    return (
        <Breadcrumb items={path.map(item => ({title: item}))}/>
    )
}

export default DepartmentBreadcamb