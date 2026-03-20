import { IDepartment } from "@/entities/Departments/lib"
import APIJsonRequest from "@/shared/api/APIJsonRequest"
import { IFeatureFlag } from "../ui/FFTable"

const URL_ORGANISATION = process.env.NEXT_PUBLIC_API_ORGANISATIONS_URL_V1

interface IFeatureFlagByDepartmentResponse {
    items: IFeatureFlagResponse[]
    limit: number
    offset: number
    total: number
}

interface IFeatureFlagResponse {
    featureFlag: Omit<IFeatureFlag, 'departmentName' | 'departmentId'> & {nodeId: number}
    belongsToNode: Omit<IDepartment, 'children' | 'featureFlags'>
}

const FFApi = {


    getFeatureFlagsByDepartment: async (departmentId: number, organisationId: number,): Promise<IFeatureFlag[]> => {
        const responseData = await APIJsonRequest<IFeatureFlagByDepartmentResponse>(
            `${URL_ORGANISATION}/${organisationId}/nodes/${departmentId}/feature-flags/linked?limit=42&offset=0&relation=descendant`
        )
        // console.log(responseData.items)
        return responseData.items.map(({featureFlag: {nodeId, ...featureFlag}, belongsToNode: belongsToNode}) => ({
            ...featureFlag, 
            departmentId: nodeId, 
            departmentName: belongsToNode.name
        }))

    },

    getFeatureFlagsByDepartments: async (departmentIds: number[], organisationId: number): Promise<IFeatureFlag[]> => {

        const response = await Promise.all(departmentIds.map((departmentId) => FFApi.getFeatureFlagsByDepartment(departmentId, organisationId)))
        // const resp = APIJsonRequest<IFeatureFlag[]>(
        //     `${URL_ORGANISATION}`,
        //    { method: 'POST',
        //     body: JSON.stringify(departments)}
        // )
        // const response = await fetch(`url`,{
        //     method: 'POST',
        //     headers: {'Content-type': 'aplication/json'},
        //     body: `${JSON.stringify(departments)}`
        // })
        

        const l = response.reduce((allDepartments, departments) => {
        // console.log(departments)

            return ([...departments, ...allDepartments])
        }, [])
        // console.log(l)
        return l
    },
    
    switchFeatureFlags: async (organisationId: number, departmentId: number, featureFlagId: number, isEnabled: boolean): Promise<void> => {
        const resp = APIJsonRequest<IFeatureFlag[]>(
            `${URL_ORGANISATION}/${organisationId}/nodes/${departmentId}/feature-flags/${featureFlagId}`,
            {body: JSON.stringify({value: isEnabled, version: 1})}
        )
    },
}

export default FFApi