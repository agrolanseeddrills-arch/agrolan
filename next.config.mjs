/** @type {import('next').NextConfig} */
const nextConfig = {
  productionBrowserSourceMaps: true,
  distDir: process.env.DIST_DIR || '.next',
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
      {
        protocol: 'https',
        hostname: 'images.pixabay.com',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/landing-page',
        permanent: false,
      },
    ];
  },
  // Видалено webpack конфігурацію з @dhiwise/component-tagger через проблеми з ES модулями
  // Цей loader використовувався для розробки і не є критичним для роботи проєкту
};

export default nextConfig;
