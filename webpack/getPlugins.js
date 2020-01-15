const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

exports.getPlugins = (isDevelopment) => {
  const plugins = [
    new HtmlWebpackPlugin({
      template: 'index.html',
      hash: true,
    }),
    new MiniCssExtractPlugin({ filename: 'css/[name].css' })
  ];

  if (!isDevelopment) {
    plugins.push(new OptimizeCssAssetsPlugin(), new CleanWebpackPlugin())
  }

  return plugins;
};
