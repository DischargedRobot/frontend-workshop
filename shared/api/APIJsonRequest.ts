import { RequestOptions } from "http";
import { APIError, mapAPIErrors } from "./APIErrors";

const API_URL = process.env.NEXT_PUBLIC_API_URL_V1 

const APIJsonRequest = async (
    endpoint: string,
    options: RequestOptions = {}
) => {
    try {
        const response = await fetch(`${API_URL}/${endpoint}`, {
            credentials: 'include',
            ...options,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json', 
                ...(options.headers as Record<string, string> || {}),
            }
            
        })

        if (!response.ok) {
            throw mapAPIErrors(response.status)
        }

        const data = await response.json()

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