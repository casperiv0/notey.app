module.exports = {
  webpack: (config, { webpack }) => {
    config.plugins.push(new webpack.IgnorePlugin(/\/server_old|client_old|docs\//));

    // Important: return the modified config
    return config;
  },
};
