const withPWA = require("next-pwa");

module.exports = withPWA({
  future: {
    webpack5: true,
  },
  async headers() {
    return [
      {
        source: "/fonts/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/signup",
        destination: "/auth/register",
        permanent: true,
      },
      {
        source: "/signin",
        destination: "/auth/login",
        permanent: true,
      },
    ];
  },
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        react: "preact/compat",
        "react-dom/test-utils": "preact/test-utils",
        "react-dom": "preact/compat",
      };
    }

    return config;
  },
  reactStrictMode: true,
  experimental: {
    turboMode: true,
  },
  pwa: {
    disable: process.env.NODE_ENV === "development",
    dest: "public",
    buildExcludes: [/chunks\/pages\/app.js/, /chunks\/pages\/share\/.*$/],
  },
});
