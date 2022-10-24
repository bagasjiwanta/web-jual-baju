/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  env: {
    GRAPHQL_API_ENDPOINT: process.env.GRAPHQL_API_ENDPOINT,
  },
  images: {
    domains: ["media.graphassets.com", "picsum.photos"],
  },
};

module.exports = nextConfig;
