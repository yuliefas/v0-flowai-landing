const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.[contenthash].js',
    clean: true,
    // For custom domain (flowai.xyz), use '/'
    // For GitHub Pages subdomain (username.github.io/flow-pages), use '/flow-pages/'
    // Default: '/' for custom domain or local development
    publicPath: process.env.CUSTOM_DOMAIN === 'true' || !process.env.GITHUB_PAGES ? '/' : '/flow-pages/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      inject: 'body',
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/favicon.ico', to: 'favicon.ico' },
        { from: 'src/favicon.png', to: 'favicon.png' },
        { from: 'src/flow-logo.svg', to: 'flow-logo.svg' },
        { from: 'src/flowai-og.jpg', to: 'flowai-og.jpg' },
      ],
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 3000,
    hot: true,
    open: true,
    historyApiFallback: true,
  },
  resolve: {
    extensions: ['.js', '.json'],
  },
};
