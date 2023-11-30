/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  serverRuntimeConfig: {
    dbConfig: {
      host: "eattheworld.se.mysql",
      port: 3306,
      user: "eattheworld_secountrydb",
      password: "admin123",
      database: "eattheworld_secountrydb",
    },
    secret: "7e027292-3935-46b1-a04e-c096ac38b7ef",
  },
  publicRuntimeConfig: {
    apiUrl:
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000/api" // development api
        : "http://eattheworld.se/api", // production api
  },
};

module.exports = nextConfig;
