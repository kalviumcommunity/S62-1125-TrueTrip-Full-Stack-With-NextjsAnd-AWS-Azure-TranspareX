import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Updated for Next.js 16
  serverExternalPackages: ["bcrypt"],

  eslint: {
    ignoreDuringBuilds: true,
  },

  turbopack: {
    root: __dirname, // ESM-safe root
  },
};

export default nextConfig;
