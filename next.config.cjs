/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_KEY: process.env.MONGODB_URI,
  },
};

module.exports = nextConfig;
