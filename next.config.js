/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
    formats: ["image/webp", "image/avif"],
  },
  compress: true,
  poweredByHeader: false,
  generateEtags: false,
  // Note: Custom headers are not supported with static export
  // Headers will need to be configured at the hosting level (e.g., Vercel, Netlify)
};

module.exports = nextConfig;
