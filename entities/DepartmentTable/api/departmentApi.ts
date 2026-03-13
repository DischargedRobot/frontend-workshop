import { IDepartment } from "../DepartmentTableType"

    
interface IDepartmentApi {
    getDepartments: () => Promise<IDepartment[]>
}

const departmentApi: IDepartmentApi = {
    getDepartments: async () => {
        const response = await fetch('api/getDepartments')
        
        if (!response.ok) {
            throw new Error('Ошибка получения отделов')
        }

        return await response.json()
    }
}

export default departmentApi