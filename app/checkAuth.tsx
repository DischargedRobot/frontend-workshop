
export async function checkAuth(sessionId: string): Promise<boolean> {

    const response = await fetch(process.env.CHECK_AUTH_URL as string, {
        method: "POST",
        headers: {
            'Content-type': 'aplication/json'
        },
        body: JSON.stringify({sessionId}),
    })

    if (response.ok) {
        return true
    }
    
    // TODO:: обработать 401 и 403
    return false
    
}