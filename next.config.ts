import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Serve images as AVIF/WebP where the browser supports them
  images: { formats: ["image/avif", "image/webp"] },
  // Inline the CSS into the HTML so it doesn't block the first paint
  experimental: { inlineCss: true },
};

export default nextConfig;
