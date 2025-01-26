import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	serverExternalPackages: ["dockerode"],
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "**",
			},
		],
	},
	output: "standalone",
};

export default nextConfig;
