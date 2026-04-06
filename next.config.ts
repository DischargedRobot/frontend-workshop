import type { NextConfig } from "next"
import path from "path"

const nextConfig: NextConfig = {
	async rewrites() {
		// обход корс запроса
		return [
			{
				source: "/api/v1/auth/:path*",
				destination: "http://localhost:8081/api/v1/auth/:path*",
			},
		]
	},
	turbopack: {
		resolveAlias: {
			"@": path.resolve(__dirname),
			// '@styles': path.resolve(__dirname, 'app/common/styles'),
		},
	},
	reactCompiler: true,
}

export default nextConfig
