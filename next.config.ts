import { setDefaultResultOrder } from "node:dns"
import type { NextConfig } from "next"
import path from "path"

// localhost → сначала IPv4, иначе на части Windows fetch идёт на ::1 и даёт EACCES
try {
	setDefaultResultOrder("ipv4first")
} catch {
	/* no-op */
}

const nextConfig: NextConfig = {
	output: "standalone",
	// async rewrites() {
	// 	// обход корс запроса
	// 	return [
	// 		{
	// 			source: "/api/v1/auth/:path*",
	// 			destination: "http://localhost:8081/api/v1/auth/:path*",
	// 		},
	// 	]
	// },
	turbopack: {
		resolveAlias: {
			"@": path.resolve(__dirname),
			// '@styles': path.resolve(__dirname, 'app/common/styles'),
		},
	},
	reactCompiler: true,
}

export default nextConfig
