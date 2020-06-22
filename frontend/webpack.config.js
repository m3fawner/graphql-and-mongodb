const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const CompressionPlugin = require('compression-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  entry: [
    path.resolve(__dirname, 'src', 'setup.js'),
    path.resolve(__dirname, 'src', 'index.jsx'),
  ],
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  devtool:
    process.env.NODE_ENV === 'production'
      ? 'none'
      : 'eval-cheap-module-source-map',
  resolve: {
    modules: ['node_modules'],
    extensions: ['.jsx', '.js'],
  },
  output: {
    path: path.resolve(__dirname, 'public', 'dist'),
    filename: '[name].[hash].js',
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      { test: /\.jsx?$/, use: 'babel-loader', exclude: /node_modules/ },
      { test: /\.(png|jpg|gif)$/, use: 'file-loader' },
      {
        test: /\.(png|jpg|gif)$/,
        use: 'image-webpack-loader',
        enforce: 'pre',
      },
      {
        test: /.svg$/,
        loader: '@svgr/webpack',
        options: { configFile: path.resolve(__dirname, '.svgrrc') },
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src', 'robots.txt'),
          to: path.resolve(__dirname, 'public'),
          flatten: true,
        },
        {
          from: path.resolve(__dirname, 'src', 'robots.txt'),
          to: path.resolve(__dirname, 'public'),
          flatten: true,
        },
      ],
    }),
  ].concat(
    ...(process.env.NODE_ENV === 'production'
      ? [
          new CleanWebpackPlugin(),
          new CompressionPlugin({
            test: /\.(js)$/,
            filename: '[path]',
            algorithm: 'gzip',
          }),
          new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src', 'index.html'),
            filename: path.resolve(__dirname, 'public', 'index.html'),
          }),
        ]
      : [
          new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src', 'index.html'),
          }),
          new webpack.SourceMapDevToolPlugin(),
          new webpack.DefinePlugin({
            API_URL: JSON.stringify('http://localhost:4000'),
            PUBLIC_KEY: JSON.stringify(process.env.PUBLIC_KEY),
          }),
        ])
  ),
};
