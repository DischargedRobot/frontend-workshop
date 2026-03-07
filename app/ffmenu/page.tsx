import NavigationMenu from "@/entities/NavigationMenu/NavigationMenu"
import TableDepartment, { TableData } from "@/entities/TableDepartment/TableDepartment"
import { useState } from "react";

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



export const FFMenu = () => {

    // TODO:: после хлебных крошек
    // const {
    //   getDepartmentsByPath: getDepartments
    // } = useDepartment()

    // const [departments, setDepartments] = useState([])

    return (
        <>
        <NavigationMenu/>
        <TableDepartment data={data}/>
        </>
    )
}

export default FFMenu