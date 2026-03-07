import NavigationMenu from "@/entities/NavigationMenu/NavigationMenu"
import TableDepartment, { TableData } from "@/entities/DepartmentTable/DepartmentTable"
import FullDepartmentTable from "@/widgets/FullDepartmentTable/FullDepartmentTable";



export const FFMenu = () => {

    // TODO:: после хлебных крошек
    // const {
    //   getDepartmentsByPath: getDepartments
    // } = useDepartment()

    // const [departments, setDepartments] = useState([])

    return (
        <>
        <NavigationMenu/>
        <FullDepartmentTable></FullDepartmentTable>
        </>
    )
}

export default FFMenu