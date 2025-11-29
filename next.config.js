const nextConfig = {
  experimental: {
    optimizeCss: true,    // tailwind v4
    turbo: {
      enabled: false,     // ❌ disable turbopack
    },
  },
};

export default nextConfig;
