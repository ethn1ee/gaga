import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import("next").NextConfig} */
const config = {
  assetPrefix: undefined,
  images: {
    remotePatterns: [
      { hostname: "5ohpjhzc4espaz0u.public.blob.vercel-storage.com" },
    ],
    qualities: [25, 50, 75],
  },
  experimental: {
    ppr: "incremental",
  },
};

export default withNextIntl(config);
