const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const lessPluginGlob = require('less-plugin-glob');

// Helpers
const { getPlugins } = require('./webpack/getPlugins');

module.exports = (env = {}) => {
  const { isDevelopment = false } = env;

  return {
    context: path.resolve(__dirname, './src'),
    mode: isDevelopment ? 'development' : 'production',
    devtool: isDevelopment ? 'source-map' : '',

    entry: {
      editor: './js/index.js'
    },

    output: {
      filename: 'js/[name].js',
      path: path.resolve(__dirname, './dist'),
      publicPath: '/',
    },

    devServer: {
      contentBase: './dist',
      open: true,
      port: 8080,
      hot: true
    },

    module: {
      rules: [
        {
          test: /\.js$/,
          use: {
            loader: 'babel-loader',
          }
        },
        {
          test: /\.(less|css)$/,
          use: [
            'css-hot-loader',
            {
              loader: MiniCssExtractPlugin.loader
            },
            {
              loader: 'css-loader',
              options: {
                sourceMap: isDevelopment,
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: isDevelopment
              }
            },
            {
              loader: 'less-loader',
              options: {
                plugins: [lessPluginGlob],
                sourceMap: isDevelopment,
                paths: [path.resolve(__dirname, './styles')]
              }
            },
          ]
        },
      ]
    },

    plugins: [...getPlugins(isDevelopment)]
  }
};
