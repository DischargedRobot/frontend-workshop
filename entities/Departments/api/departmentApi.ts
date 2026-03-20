import { IDepartment } from "../lib/DepartmentType"
import APIJsonRequest from "@/shared/api/APIJsonRequest"
import { isAPIError } from "@/shared/api/APIErrors"
import { IOrganisation } from "@/entities/Organisation/model/useOrganisationStore"

const URL_ORGANISATION = process.env.NEXT_PUBLIC_API_ORGANISATIONS_URL_V1
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
    limit: number
    offset: number
    total: number
}

const convertIDepartmentResponseToIDepartment = (departmentsResponse: IDepartmentResponse[], organisation: IOrganisation): IDepartment[] => {
    // Мапим, чтобы потом было проще обратиться к узлу во время операций, а не писать find 
    const nodeMap = new Map<number, IDepartment>()

    // Обрабатываем вход в map
    departmentsResponse.forEach((depResp) => {
        nodeMap.set(depResp.id, {id: depResp.id, name: depResp.name, children: [], featureFlags: [], link: '', isService: depResp.isService, version: depResp.version})
    })

    // Тут мы закидывает департаменты в детей других узлов
    const nodes: IDepartment[] = []
    departmentsResponse.forEach(item => {
        const path = item.path.split('.')
        //TODO поменять условия местави, т.к. так будет быстрее
        // тут не может быть undefined, толькое если бекенд накосячил накосячил...
        if (path.length <= 2) {
            if (path.length == 2)
            {
                const node = nodeMap.get(parseInt(path[1]))!
                organisation.children.children.push(node)
                nodes.push(node)
            } else {
                organisation.children = (nodeMap.get(parseInt(path[0]))!)

            }
        }
        // условиие обхода корневого, т.к. у него длина 1
        else if (path.length > 2) {
            // console.log(nodeMap.get(parseInt(path.at(-2)!)), path, nodeMap)
            nodeMap.get(parseInt(path.at(-2)!))?.children.push(nodeMap.get(item.id)!)
        }
    })

    return nodes
}

const departmentApi = {
    getDepartmentsByOrganisationId: async (organisation: IOrganisation): Promise<IDepartment[]> => {
        const responseData = await APIJsonRequest<IDepartmentsByOrganisationId>(
            `${URL_ORGANISATION}/${organisation.id}/nodes?limit=42&offset=0`,
            {method: 'GET'}
        )

        return convertIDepartmentResponseToIDepartment(responseData.items, organisation) 
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

    addDepartment: async (departmentName: string, organisationId: number, parentId: number) => {

        APIJsonRequest(
            `${URL_ORGANISATION}/${organisationId}/nodes`, 
            {method: 'POST',
            body: JSON.stringify({name: departmentName, isService: false, parentId: parentId})
        })
        
    },

    removeDepartmentById: async (organisationId: number, departmentId: number) => {
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

    
    removeDepartmentsByIds: async (organisationId: number, departmentIds: number[]) => {
        await Promise.all(departmentIds.map((departmentId) => {departmentApi.removeDepartmentById(organisationId, departmentId)}))
    },

    changeDepartmentName: async (newDepartment: IDepartment, organisationId: number): Promise<void> => {
        await APIJsonRequest(
            `${URL_ORGANISATION}/${organisationId}/nodes/${newDepartment.id}`,
            {method: 'PATCH',
            body: JSON.stringify({name: `${newDepartment.name}`,  isService: newDepartment.isService, version: newDepartment.version})
        })

        newDepartment.version++
    },
}

export default departmentApi