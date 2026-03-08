import NavigationMenu from "@/entities/NavigationMenu/NavigationMenu"
import FullDepartmentTable from "@/widgets/FullDepartmentTable/FullDepartmentTable";
import FFTable from "@/entities/FFTable/FFTable";



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
        <FFTable></FFTable>
        </>
    )
}

export default FFMenu