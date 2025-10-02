/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    async redirects() {
    return [
      {
        source: '/index.html',
        destination: '/',
        permanent: true,
      },
      {
        source: '/index.php',
        destination: '/',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.wcaquiz.vercel.app' }],
        destination: 'https://wcaquiz.vercel.app/:path*',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
