/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove 'serverExternalPackages' and 'turbopack' if they're causing issues
  experimental: {
    // Add any experimental features you need here
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  }
};

export default nextConfig;