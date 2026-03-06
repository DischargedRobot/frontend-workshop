import type { AuthOptions } from "next-auth"
import Credentials from "next-auth/providers/credentials"

export const authConfig: AuthOptions = {
    providers: [
        Credentials({
            credentials:{
                login: { label: 'login', type: 'text', required: true},
                password: { label: 'password', type: 'password', required: true}
            },
            async authorize(credentials) {

                const response = await fetch(process.env.CHECK_AUTH_URL as string, {
                    method: "POST",
                    headers: {'Content-type': "aplication/json"},
                    body: JSON.stringify({
                        ...credentials
                    }),
                })

                if (!response.ok) return null
                const responseData = await response.json()
                return {
                    id: responseData.user.sessionId,
                    login: responseData.user.login,
                    // password: responseData.user.password,
                }
            }
            
        })
    ],
    pages: {
        signIn: '/login'
    },
}