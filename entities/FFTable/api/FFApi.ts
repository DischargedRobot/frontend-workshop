import { IDepartment } from "@/entities/Departments/lib"
import APIJsonRequest from "@/shared/api/APIJsonRequest"
import { IFeatureFlag } from "../ui/FFTable"

const URL_ORGANISATION = process.env.NEXT_PUBLIC_API_ORGANISATIONS_URL_V1

const FFApi = {

    getFeatureFlagsByDepartments: async (departments: IDepartment[]): Promise<IFeatureFlag[]> => {

        const resp = APIJsonRequest<IFeatureFlag[]>(
            `${URL_ORGANISATION}`,
           { method: 'POST',
            body: JSON.stringify(departments)}
        )
        // const response = await fetch(`url`,{
        //     method: 'POST',
        //     headers: {'Content-type': 'aplication/json'},
        //     body: `${JSON.stringify(departments)}`
        // })
        
        return resp
    },
    
    switchFeatureFlags: async (organisationId: number, departmentId: number, featureFlagId: number, isEnabled: boolean): Promise<void> => {
        const resp = APIJsonRequest<IFeatureFlag[]>(
            `${URL_ORGANISATION}/${organisationId}/nodes/${departmentId}/feature-flags/${featureFlagId}`,
            {body: JSON.stringify({value: isEnabled, version: 1})}
        )
    }
}

export default FFApi