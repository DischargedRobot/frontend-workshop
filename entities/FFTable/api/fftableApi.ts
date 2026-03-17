import { IDepartment } from "@/entities/Departments/lib"

const FFTableApi = {
    getFeatureFlagsByDepartments: async (departments: IDepartment[]) => {
        const response = await fetch(`url`,{
            method: 'POST',
            headers: {'Content-type': 'aplication/json'},
            body: `${JSON.stringify(departments)}`
        })
        
        return await response.json()
    },
}

export default FFTableApi