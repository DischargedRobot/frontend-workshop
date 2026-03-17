import { IDepartment } from "../lib/DepartmentType"

    
interface IDepartmentApi {
    getDepartments: () => Promise<IDepartment[]>
    getDepartmentsByPath: (path: string) => Promise<IDepartment[]>

}

const departmentApi: IDepartmentApi = {
    getDepartments: async () => {
        const response = await fetch('api/getDepartments')
        
        if (!response.ok) {
            throw new Error('Ошибка получения отделов')
        }

        return await response.json()
    },

    getDepartmentsByPath: async (path: string) => {
        const response = await fetch(`${path}`,{
            method: 'GET',
            headers: {'Content-type': 'aplication/json'},
        })

        if (!response.ok) {
            throw new Error('getDepartmentsByPath')
        }

        return await response.json()
    },


}

export default departmentApi