import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    // No hotlinked press photos (CLAUDE.md rule 2). Only YouTube posters for
    // embedded campaign videos are allowed from a remote host.
    remotePatterns: [{ protocol: "https", hostname: "i.ytimg.com" }],
    formats: ["image/avif", "image/webp"],
  },
};

export default withNextIntl(nextConfig);
