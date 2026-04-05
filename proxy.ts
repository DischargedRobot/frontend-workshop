import { connection, NextRequest, NextResponse } from "next/server"

const protectRoutes = ["/personal"]

const AUTH_URL = process.env.API_AUT_URL_V1

// ставим полученный куки из респонса в некст респонс
const setCookieFromApiResponse = (
	apiResponse: Response,
	nextResponse: NextResponse,
	nameOfCookie: string,
) => {
	const setCookieHeaders = apiResponse.headers.getSetCookie()

	// Ищем нужную куку
	const targetCookie = setCookieHeaders.find((cookieString) =>
		cookieString.startsWith(`${nameOfCookie}=`),
	)
	if (!targetCookie) {
		return false
	}

	// в таком виде шлются куки с атрибутами
	// ["SESSION=new456; HttpOnly; Secure; Path=/; Max-Age=3600", след кука]
	const [cookiePair, ...attributesOfCookie] = targetCookie.split(";")
	const [_, cookieValue] = cookiePair.split("=")

	const cookieOptions: {
		maxAge?: number
		expires?: Date
		secure?: boolean
		httpOnly?: boolean
		sameSite?: "lax" | "strict" | "none"
		domain?: string
		path?: string
	} = {}

	// Приводим имена атрибутов к формату, который ожидает NextResponse.cookies.set()
	for (const attr of attributesOfCookie) {
		const [attrName, attrValue] = attr.trim().split("=")
		switch (attrName.toLowerCase()) {
			case "max-age":
				cookieOptions.maxAge = parseInt(attrValue, 10)
				break
			case "expires":
				cookieOptions.expires = new Date(attrValue)
				break
			case "secure":
				cookieOptions.secure = true
				break
			case "httponly":
				cookieOptions.httpOnly = true
				break
			case "samesite":
				cookieOptions.sameSite = attrValue as "lax" | "strict" | "none"
				break
			case "domain":
				cookieOptions.domain = attrValue
				break
			case "path":
				cookieOptions.path = attrValue
				break
		}
	}

	nextResponse.cookies.set(nameOfCookie, cookieValue, cookieOptions)
}

export default async function proxy(request: NextRequest) {
	await connection() // чтобы в рантайме брал прееменные окружения

	const pathname = request.nextUrl.pathname
	const origin = request.nextUrl.origin

	const autURL = new URL("/login", origin)

	const isProtectedPath = protectRoutes.some((route) =>
		pathname.startsWith(route),
	)
	const hasSession = !!request.cookies.get("SESSION")
	// если без кук получает доступ к защищёному пути - редиректим,
	// если не защищёный и нет куки то пофиг на куки
	// если не защищённый и есть куки то надо рефрешить куки
	if (!isProtectedPath && !hasSession) {
		return NextResponse.next()
	} else if (!hasSession) {
		return NextResponse.redirect(autURL)
	} else {
		const cookieHeader = request.headers.get("cookie") || ""
		// рефрешим
		try {
			const response = await fetch(`${AUTH_URL}/refresh`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Cookie: cookieHeader,
				},
			})

			// если не смогли срефрешить, то на логин
			if (!response.ok) {
				console.log("ошибка при рефреше", response)
				return NextResponse.redirect(autURL)
			}

			const next = NextResponse.next()
			setCookieFromApiResponse(response, next, "SESSION")
			console.log("всё ок")

			return next
		} catch (error) {
			//TODO: кидать на страницу с ошибкой надо
			console.log(error)
		}
	}
}

export const config = {
	matcher: ["/personal/:path*"],
}
