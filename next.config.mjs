/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["fakestoreapi.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fakestoreapi.com",
      },
    ],
    // Allow external images to render even if optimization fails in some hosts
    unoptimized: true,
  },
};

export default nextConfig;
