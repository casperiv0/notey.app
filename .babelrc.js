module.exports = {
  presets: ["next/babel"],
  plugins: [
    "babel-plugin-transform-typescript-metadata",
    ["@babel/plugin-proposal-decorators", { legacy: true }],
    "babel-plugin-parameter-decorator",
    [
      "babel-plugin-styled-components",
      {
        displayName: true,
        fileName: false,
      },
    ],
  ],
};
