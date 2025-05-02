/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";

/** @type {import("next").NextConfig} */
const config = {
  // You can add other Next.js configurations here if needed
};

export default config;

// Export the middleware matcher configuration
export const middlewareMatcher = {
  // This tells Next.js to run middleware on all routes under /dashboard
  matcher: ["/dashboard/:path*"],
};
