require("dotenv").config();

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    ALCHEMY_KEY: process.env.ALCHEMY_KEY,
    THEGRAPH_URL: process.env.THEGRAPH_URL,
    PINATA_API_SECRET: process.env.PINATA_API_SECRET,
    PINATA_API_KEY: process.env.PINATA_API_KEY,
    IPFS_IMAGE_HASH: process.env.IPFS_IMAGE_HASH,
  },
  experimental: {
    appDir: false,
  },
};

module.exports = nextConfig;

module.exports = {
  future: {
    webpack5: true, // by default, if you customize webpack config, they switch back to version 4.
    // Looks like backward compatibility approach.
  },
  webpack(config) {
    config.resolve.fallback = {
      ...config.resolve.fallback, // if you miss it, all the other options in fallback, specified
      // by next.js will be dropped. Doesn't make much sense, but how it is
      fs: false, // the solution
    };

    return config;
  },
};
