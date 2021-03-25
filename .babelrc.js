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
