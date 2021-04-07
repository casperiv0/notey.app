module.exports = {
  future: {
    webpack5: true,
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
};
