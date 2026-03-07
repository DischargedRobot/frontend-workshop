import NavigationMenu from "@/entities/NavigationMenu/NavigationMenu"
import TableDepartment, { TableData } from "@/entities/TableDepartment/TableDepartment"

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

    return (
        <>
        <NavigationMenu/>
        <TableDepartment data={data}/>
        </>
    )
}

export default FFMenu