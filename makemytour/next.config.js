/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  async rewrites() {
    return [
      {
        source: '/flight/:path*',
        destination: 'https://makemytrip-clone-17hl.onrender.com/flight/:path*',
      },
      {
        source: '/hotel/:path*',
        destination: 'https://makemytrip-clone-17hl.onrender.com/hotel/:path*',
      },
      {
        source: '/user/:path*',
        destination: 'https://makemytrip-clone-17hl.onrender.com/user/:path*',
      },
    ];
  },
};

module.exports = nextConfig;