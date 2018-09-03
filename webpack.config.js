const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const node_env = process.env.NODE_ENV || 'production';
const isDev = node_env === 'development';
const config = {
  entry: {
    page1: path.resolve('src/app/index.js'),
    // vendor: ''
  },
  output: {
    path: path.resolve('dist'),
    filename: 'bundle.js'
  },
  mode: node_env,
  // devtool: isDev ? 'source-map' : 'eval',
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.css'],
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: [
        isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
        'css-loader',
      ]
    }, {
      test: /\.js$/,
      use: [{
        loader: 'babel-loader',
      }],
      exclude: path.resolve('node_modules'),
    }]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV' : JSON.stringify(node_env)
    }),
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: isDev ? '[name].css' : '[name].[hash].css',
      chunkFilename: isDev ? '[id].css' : '[id].[hash].css',
    })
  ],
};

if (isDev) {
  config.devServer = {
    contentBase: path.resolve('src/app'),
    inline: true,
    hot: true,
    port: 3005,
    overlay: true,
    stats: "errors-only",
  }
}
module.exports = config;
