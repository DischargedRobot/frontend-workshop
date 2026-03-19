import { RequestOptions } from "https";
import { APIError, mapAPIErrors } from "./APIErrors";



const APIJsonRequest = async <T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> => {
    try {
        const response = await fetch(endpoint, {
            // credentials: 'include',
            ...options,
            headers: {
                'Content-Type': 'application/json',
                // 'Accept': 'application/json', 
                ...options.headers,
            }
        })

        if (!response.ok) {
            throw mapAPIErrors(response.status)
        }

        const data: T = await response.json()

        return data

    } catch(error) {

        // если нет сети
        if (error instanceof TypeError && error.message === "Failed to fetch") {
            throw mapAPIErrors(400)
        }

        // если не наша, то пусть будет серверной (на всякий случай, мало ли)
        if (error instanceof APIError) {
            throw mapAPIErrors(500)
        }

        throw error
    }


}

export default APIJsonRequest