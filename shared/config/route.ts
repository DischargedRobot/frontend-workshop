export async function GET() {
	return Response.json({
		apiUrl: process.env.NEXT_PUBLIC_API_URL_V1,
		authServiceUrl: process.env.NEXT_PUBLIC_AUTH_SERVICE_URL_V1,
		authUrl: process.env.NEXT_PUBLIC_AUTH_URL_V1,
		clientUrl: process.env.NEXT_PUBLIC_CLIENT_URL_V1,
		organisationsUrl: process.env.NEXT_PUBLIC_API_ORGANISATIONS_URL_V1,
	})
}
