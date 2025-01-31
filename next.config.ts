import type { NextConfig } from 'next';
//load .env variables
import { config } from 'dotenv';
const vars = config();

export const STEAM_API_KEY =
  vars.parsed?.STEAM_API_KEY ?? process.env.STEAM_API_KEY;
export const STEAM_API_URL = 'http://api.steampowered.com';
export const STEAM_STORE_API_URL = 'https://store.steampowered.com/api';
const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/steam-api/:path*',
        destination: `${STEAM_API_URL}/:path*?key=${STEAM_API_KEY}`,
      },
      {
        source: '/steam-store-api/:path*',
        destination: `${STEAM_STORE_API_URL}/:path*`,
      },
      {
        source: '/steam-community-api/:path*',
        destination: `https://steamcommunity.com/:path*`,
      },
    ];
  },
};
export default nextConfig;
