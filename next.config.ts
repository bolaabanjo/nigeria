import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  // The crawled page index is read at request time, so ship it with the server.
  outputFileTracingIncludes: { "/api/chat": ["./index/pages.db"], "/": ["./index/pages.db"] },
  allowedDevOrigins: ["*.preview.tensorade.app", "*.cencori.app"],
};

export default nextConfig;
