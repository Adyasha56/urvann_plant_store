// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true, // disables next/image optimization, so no need to whitelist domains
  },
  eslint: {
    ignoreDuringBuilds: true, // ignores ESLint errors during build
  },
};

export default nextConfig;
