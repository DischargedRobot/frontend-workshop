import { RequestOptions } from "http"
import { IDepartment } from "../lib/DepartmentType"
import APIJsonRequest from "@/shared/api/APIJsonRequest"
import { error } from "console"
import { APIError, isAPIError } from "@/shared/api/APIErrors"

const URL_ORGANISATION = process.env.NEXT_PUBLIC_API_ORGANISATIONS_URL_V1
    
interface IDepartmentApi {
    getDepartmentsByOrganisationId: (organisation: number) => Promise<IDepartment[]>
    getDepartmentsByPath: (path: string) => Promise<IDepartment[]>
    addDepartment: (departmentName: string, organisation: number, parentId: number) => Promise<void>

    removeDepartmentById: (organisationId: number, departmentId: number) => Promise<void>
    removeDepartmentsByIds: (organisationId: number, departmentId: number[]) => Promise<void>
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
        // условиие обхода корневого, т.к. у него длина 1
        if (path.length == 2)
        {
            nodes.push(nodeMap.get(parseInt(path[1]))!)
        }
        else if (path.length > 2) {
            // console.log(nodeMap.get(parseInt(path.at(-2)!)), path, nodeMap)
            nodeMap.get(parseInt(path.at(-2)!))?.children.push(nodeMap.get(item.id)!)
        }
    })

    return nodes
}

const departmentApi: IDepartmentApi = {
    getDepartmentsByOrganisationId: async (organisationId: number) => {
        const responseData: IDepartmentsByOrganisationId = await APIJsonRequest(
            `${URL_ORGANISATION}/${organisationId}/nodes?limit=42&offset=0`,
            {method: 'GET'}
        )

        return convertIDepartmentResponseToIDepartment(responseData.items) 
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

    addDepartment: async (departmentName, organisation, parentId) => {
        const response = APIJsonRequest(
            `${URL_ORGANISATION}/${organisation}/nodes`, 
            {method: 'POST',
            body: JSON.stringify({name: departmentName, isService: false, parentId: parentId})
        })
        
    },


    removeDepartmentById: async (organisationId, departmentId) => {
        try { 
            await APIJsonRequest(
                `${URL_ORGANISATION}/${organisationId}/nodes/${departmentId}`,
                {method: 'DELETE'}
            )
        console.log('всё хорошо')

        } catch (error: unknown) {
            if (isAPIError(error))
            {
                switch (error.status) {
                    case 401: {
                        console.log(error.message)
                        return
                    }
                }
            }
            
            console.log('всё плохо(((')
        }
    },

    
    removeDepartmentsByIds: async (organisationId, departments) => {
        await Promise.all(departments.map((department) => {departmentApi.removeDepartmentById(organisationId, department)}))
    }
}

export default departmentApi