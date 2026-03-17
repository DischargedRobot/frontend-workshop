import { IDepartment } from "../lib"

type IUseDepartment = () =>  {
    getDepartmentsByPath: (path: string) => void
    getFeatureFlagsByDepartments: (departments: IDepartment[]) => void
}

const useDepartments: IUseDepartment = () => {

    const getDepartmentsByPath = async (path: string) => {
        const response = await fetch(`${path}`,{
            method: 'GET',
            headers: {'Content-type': 'aplication/json'},
        })

        if (!response.ok) {
            throw new Error('getDepartmentsByPath')
        }

        return await response.json()
    }

    const getFeatureFlagsByDepartments = async (departments: IDepartment[]) => {
        const response = await fetch(`url`,{
            method: 'POST',
            headers: {'Content-type': 'aplication/json'},
            body: `${JSON.stringify(departments)}`
        })
        
        return await response.json()
    }

    return ({
        getDepartmentsByPath, 
        getFeatureFlagsByDepartments
    })

}

// export default useDepartments