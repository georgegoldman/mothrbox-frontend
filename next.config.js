/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";

/** @type {import("next").NextConfig} */
const config = {
  // --- FIX: Prevent "Call retries were exceeded" / Worker Crashes ---
  experimental: {
    workerThreads: false,
    cpus: 1,
  },

  // --- FIX: Silence Turbopack warning ---
  turbopack: {},

  // --- 1. Enable WebAssembly Support ---
  webpack: (config) => {
    config.experiments = {
      ...config.experiments,
      asyncWebAssembly: true,
      layers: true,
    };
    return config;
  },

  // --- 2. Security Headers (Critical for Browser Crypto) ---
  // These headers are required for High-Security cryptography in some browsers
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
          { key: "Cross-Origin-Embedder-Policy", value: "require-corp" },
        ],
      },
    ];
  },
};

export default config;

// Export the middleware matcher configuration
export const middlewareMatcher = {
  // This tells Next.js to run middleware on all routes under /dashboard
  matcher: ["/dashboard/:path*"],
};
