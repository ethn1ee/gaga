/** @type {import("next").NextConfig} */
const config = {
  assetPrefix: undefined,
  images: {
    remotePatterns: [
      { hostname: "5ohpjhzc4espaz0u.public.blob.vercel-storage.com" },
    ],
  },
  experimental: {
    nodeMiddleware: true,
    ppr: "incremental",
  },
};

export default config;
