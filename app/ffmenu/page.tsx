import NavigationMenu from "@/entities/NavigationMenu/NavigationMenu"
import TableDepartment, { TableData } from "@/entities/TableDepartment/TableDepartment"

const data: TableData[] = [
  {
    key: '1',
    name: 'John Brown',
    roleName: 'John Brown',
    link: '12312',
  },
  {
    key: '2',
    name: 'Jim Green',
    roleName: 'John Brown',
    link: '#!',
  },
  {
    key: '3',
    name: 'Joe Black',
    roleName: 'John Brown',
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