/** @type {import('next').NextConfig} */

const nextConfig = {
  experimental: {
    appDir: true,
  },
  reactStrictMode: true,

  compiler: {
    styledComponents: true,
  },
};

module.exports = nextConfig;
