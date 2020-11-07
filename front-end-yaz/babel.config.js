module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    "@babel/plugin-transform-runtime",
    ["@babel/plugin-proposal-class-properties", { loose: true }],
  ],
  env: {
    testing: {
      presets: [
        [ "@babel/preset-env", { targets: { node: "current" }}],
      ],
    },
  }
}
