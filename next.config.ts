import type { NextConfig } from 'next';
//load .env variables
import { config } from 'dotenv';
const vars = config();

export const STEAM_API_KEY = vars.parsed?.STEAM_API_KEY;
export const STEAM_API_URL = 'http://api.steampowered.com';
const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: '/steam-api/:path*',
        destination: `${STEAM_API_URL}/:path*?key=${STEAM_API_KEY}`,
      },
    ];
  },
};
export default nextConfig;
