module.exports = {
  presets: ["next/babel"],
  plugins: [
    [
      "module-resolver",
      {
        root: ["./src"],
        alias: {
          "@components": "./src/components",
          "@icons": "./src/components/icons",
          "@hooks": "./src/hooks",
          types: "./src/interfaces",
          "@lib": "./src/lib",
          "@modals": "./src/models",
        },
      },
    ],
    [
      "babel-plugin-styled-components",
      {
        displayName: true,
        fileName: false,
      },
    ],
  ],
};
