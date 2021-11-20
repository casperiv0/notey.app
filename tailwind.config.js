module.exports = {
  mode: "jit",
  purge: ["./app/**/*.tsx", "./app/**/*.ts"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        dark: "#101010",
        "dark-1": "#141414",
        "dark-2": "#181818",
        "dark-3": "#202020",
        "dark-4": "#252525",
        "dark-5": "#2f2f2f",
        "dark-6": "#343434",
      },
    },
  },
  variants: {},
  plugins: [],
};
