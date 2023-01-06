/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'courses-top.ru',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'cdn-bucket.hb.bizmrg.com',
      }
    ],
  },
  webpack: (config) => {
    config.module.rules.push({
      loader: '@svgr/webpack',
      issuer: /\.[j|t]sx?$/,
      options: {
        prettier: false,
        svgo: true,
        svgoConfig: {
          plugins: [{
            name: 'preset-default',
            params: {
              override: {
                removeViewBox: false,
              }
            }
          }, ],
        },
        titleProp: true,
      },
      test: /\.svg$/,
    });
    return config;
  }
};

module.exports = nextConfig;