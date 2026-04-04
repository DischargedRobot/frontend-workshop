import { IProfile } from "@/app/personal/profile/model/useProfileStore"

const loginApi = {
	checkAuth: async (sessionId: string): Promise<IProfile | false> => {
		const response = await fetch(process.env.CHECK_AUTH_URL as string, {
			method: "POST",
			headers: {
				"Content-type": "aplication/json",
			},
			body: JSON.stringify({ sessionId }),
		})

		if (response.ok) {
			return response.json()
		}

		// TODO:: обработать 401 и 403
		return false
	},
}

export default loginApi
