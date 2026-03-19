import { RequestOptions } from "http"
import { IDepartment } from "../lib/DepartmentType"

const URL = process.env.NEXT_PUBLIC_API_ORGANISATIONS_URL_V1
    
interface IDepartmentApi {
    getDepartmentsByOrganisationId: (organisation: number) => Promise<IDepartment[]>
    getDepartmentsByPath: (path: string) => Promise<IDepartment[]>
    addDepartment: (department: Omit<IDepartment, 'id'>, organisation: number) => Promise<void>

    removeDepartment: (department: IDepartment) => Promise<void>
    removeDepartments: (department: IDepartment[]) => Promise<void>
}

interface IDepartmentResponse {
    "id": number,
    "organizationId": number,
    "uuid": string,
    "path": string,
    "name": string,
    "isService": false,
    "version": number,
}

interface IDepartmentsByOrganisationId {
    items: IDepartmentResponse[]
}


const convertIDepartmentResponseToIDepartment = (departmentsResponse: IDepartmentResponse[]): IDepartment[] => {
    // Мапим, чтобы потом было проще обратиться к узлу во время операций, а не писать find 
    const nodeMap = new Map<number, IDepartment>()

    // Обрабатываем вход в map
    departmentsResponse.forEach((depResp) => {
        nodeMap.set(depResp.id, {id: depResp.id, name: depResp.name, children: [], featureFlags: [], link: ''})
    })

    // Тут мы закидывает департаменты в детей других узлов
    const nodes: IDepartment[] = []
    departmentsResponse.forEach(item => {
        const path = item.path.split('.')
        // тут не может быть undefined, толькое если бекенд накосячил накосячил...
        if (path.length === 1)
        {
            nodes.push(nodeMap.get(parseInt(path[0]))!)
        }
        else {
            // console.log(nodeMap.get(parseInt(path.at(-2)!)), path, nodeMap)
            nodeMap.get(parseInt(path.at(-2)!))?.children.push(nodeMap.get(item.id)!)
        }
    })

    return nodes
}

const departmentApi: IDepartmentApi = {
    getDepartmentsByOrganisationId: async (organisation: number) => {

        const response = await fetch(`${URL}/${organisation}/nodes?limit=42&offset=0`)
        
        if (!response.ok) {

            switch (response.status) {

                case(400): {
                    throw new Error('У вас недостаточно прав')
                }
                case(400): {
                    throw new Error('У вас недостаточно прав')
                }

            }
        }

        if (!response.ok) {
            throw new Error('Ошибка получения отделов')
        }

        const data: IDepartmentsByOrganisationId = await response.json()

        return convertIDepartmentResponseToIDepartment(data.items) 
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

    addDepartment: async (department, organisation) => {
        const response = await fetch(`${URL}/${organisation}/nodes?limit=42&offset=0`,{
            method: 'POST',
            headers: {'Content-type': 'aplication/json'},
            body: JSON.stringify(department)
        })

        if (!response.ok) {
            throw new Error('getDepartmentsByPath')
        }
    },


    removeDepartment: async (department) => {
        const response = await fetch(`${URL}/${department}`)
    },

    removeDepartments: async (department) => {
        const response = await fetch(`${URL}/${department[0]}`)
    }
}

export default departmentApi