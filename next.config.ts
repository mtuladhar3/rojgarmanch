import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
  },
  async redirects() {
    return [
      { source: "/category/samaj", destination: "/category/desh-samaj", permanent: true },
      { source: "/category/desh-ramailo-sansar", destination: "/category/ramailo-sansar", permanent: true },
    ];
  },
};

export default nextConfig;
