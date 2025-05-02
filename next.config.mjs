const nextConfig = {
  reactStrictMode: true,
  experimental: {
    turbo: { dev: true },
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  }
};

export default nextConfig;
