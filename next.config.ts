import type { NextConfig } from "next"
import path from "path"

const nextConfig: NextConfig = {
	turbopack: {
		resolveAlias: {
			"@": path.resolve(__dirname),
			// '@styles': path.resolve(__dirname, 'app/common/styles'),
		},
	},
}

export default nextConfig
