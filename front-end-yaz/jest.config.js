module.exports = {
    presets: ["@vue/cli-plugin-unit-jest"],
    "transformIgnorePatterns": [
      "node_modules/(?!@atlaskit)"
    ],
    "transform": {
      "^.+\\.vue$": "vue-jest",
      "^.+\\.js$": "babel-jest"
    }
}