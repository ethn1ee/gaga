/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";

/** @type {import("next").NextConfig} */
const config = {
  assetPrefix: undefined,
  images: {
    remotePatterns: [
      { hostname: "5ohpjhzc4espaz0u.public.blob.vercel-storage.com" },
    ],
  },
};

export default config;
