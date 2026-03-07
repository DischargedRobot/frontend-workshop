import TableDepartment from "@/entities/DepartmentTable/DepartmentTable"
import { TableData } from "@/entities/DepartmentTable";
import DepartmentBreadcamb from "@/shared/DepartmentBreadcamb/DepartmentBreadcamb"

const data: TableData[] = [
  {
    key: '1',
    name: 'Depart1',
    link: '12312',
  },
  {
    key: '2',
    name: 'Depart2',
    link: '#!',
  },
  {
    key: '3',
    name: 'Depart3',
    link: '#!',
  },
];


const FullDepartmentTable = () => {

    return (
        <div>
            <DepartmentBreadcamb path={['depart1','depart1.1','depart1.1.1']}/>
            <TableDepartment data={data}/>
        </div>
    )
}


export default FullDepartmentTable