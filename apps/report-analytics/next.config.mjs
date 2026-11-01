/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@skyline/shared'],

  // The Vite shell (localhost:5000) loads the federated container from this origin,
  // so the shared static assets need permissive CORS headers.
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,HEAD,OPTIONS' },
        ],
      },
    ];
  },
};

export default nextConfig;
