const withPlugins = require("next-compose-plugins");
const withImages = require("next-images");
const webpack = require("webpack");
const path = require("path");

module.exports = withPlugins([[withImages]], {
  webpack(config, _options) {
    config.resolve.modules.push(path.resolve("./"));
    return config;
  },
});
