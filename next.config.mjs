// @ts-check
import withPlaiceholder from "@plaiceholder/next";

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
};

const config = withPlaiceholder(nextConfig);

export default config;
