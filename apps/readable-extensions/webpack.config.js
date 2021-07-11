const nrwlConfig = require('@nrwl/react/plugins/webpack.js');
const CopyPlugin = require('copy-webpack-plugin');
const webpackCommonConfig = require('../../webpack-common.config');

module.exports = (config) => {
  nrwlConfig(config);
  return {
    ...config,
    module: {
      rules: [...config.module.rules, webpackCommonConfig.tailwindWebpackRule],
    },
    plugins: [
      new CopyPlugin({
        patterns: [
          { from: './manifest.json', to: './' },
          { from: './background.js', to: './' },
        ],
      }),
    ],
  };
};
