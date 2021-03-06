const nrwlConfig = require('@nrwl/react/plugins/webpack.js');
const CopyPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const webpackCommonConfig = require('../../webpack-common.config');

module.exports = config => {
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
          { from: './content-script.js', to: './' },
          { from: './assets/images/readable_logo.png', to: './' },
        ],
      }),
      new Dotenv({
        path: './.env.local',
      }),
    ],
  };
};
