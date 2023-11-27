/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_KEY: process.env.NEXT_PUBLIC_MONGODB_URI,
  },
};

module.exports = nextConfig;
